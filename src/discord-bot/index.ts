import { Client, Intents, Message, MessageReaction, User } from 'discord.js'
import handlerClasses from './handlers'
import initializers from './initializers'
import Handler from './handlers/Handler'
import { getRepository } from 'typeorm'
import { Pagination } from '../database/entities/Pagination'
import { manageGachaPagination } from './helpers/discordEvent'

export const initDiscord = (): Promise<Client> => {
  return new Promise((resolve, reject) => {
    const client = new Client({
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
      ]
    })
    const handlers = handlerClasses.map((HandlerClass): Handler => {
      return new HandlerClass()
    })

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag} !`)
      initializers.forEach((initializer: (client: Client) => void) => initializer(client))
      resolve(undefined)
    })

    client.on('messageCreate', async (msg: Message) => {
      for (const handler of handlers) {
        const validation = await handler.validate(client, msg)

        if (validation) {
          try {
            const result = await handler.process(client, msg)
            if (result) {
              break
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
    })

    client.on('messageReactionAdd', async (reaction, user) => {
      let fullReaction: MessageReaction;

      // When we receive a reaction we check if the reaction is partial or not
      try {
        if (reaction.partial) {
          fullReaction = await reaction.fetch()
        } else {
          fullReaction = reaction as MessageReaction
        }
        if (user.partial) {
          await user.fetch()
        }
      } catch (error) {
        return
      }

      const matchingPagination = await getRepository(Pagination).findOne({
        where: { discordUser_id: user.id, discordMessage_id: fullReaction.message.id }
      })

      if (matchingPagination) {
        await manageGachaPagination(
          matchingPagination,
          fullReaction,
          user as User
        )
      }
    })

    try {
      client.login(process.env.BOT_TOKEN)
    } catch (error) {
      reject(error)
    }

    resolve(client)
  })
}

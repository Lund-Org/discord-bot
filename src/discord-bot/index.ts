import { Client, Message } from 'discord.js'
import handlerClasses from './handlers'
import initializers from './initializers'
import Handler from './handlers/Handler'

export const initDiscord = () => {
  return new Promise((resolve, reject) => {
    const client = new Client()
    const handlers = handlerClasses.map((HandlerClass): Handler => {
      return new HandlerClass()
    })

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag} !`)
      initializers.forEach((initializer: Function) => initializer(client))
      resolve(undefined);
    })

    client.on('message', async (msg: Message) => {
      for (const handler of handlers) {
        if (handler.validate(client, msg)) {
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

    try {
      client.login(process.env.BOT_TOKEN)
    } catch (error) {
      reject(error);
    }
  })
}

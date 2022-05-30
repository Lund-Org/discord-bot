import { CommandInteraction, Message } from "discord.js"
import { getRepository } from "typeorm"
import { Player } from '../../../database/entities/Player'
import { userNotFound } from './helper'

function getTwitchUsername({ msg, cmd }: {
  msg: Message;
  cmd: string[];
}): string|null {
  const [commandBuy, ...args] = cmd

  if (args.length === 1 && args[0].match(/^\w+$/)) {
    return args[0]
  }

  msg.channel.send('Erreur, le format est : "!!gacha twitch <pseudo twitch>"')
  return null
}

export const twitch = async (interaction: CommandInteraction) => {
  const player = await userNotFound({ interaction })

  if (!player) {
    return
  }

  const twitchUsername = interaction.options.getString('username', true);

  player.twitch_username = twitchUsername.toLowerCase()
  
  try {
    await getRepository(Player).save(player)
    interaction.reply(`Pseudo twitch attaché`)
  } catch (e) {
    interaction.reply(`Une erreur s'est produite lors de l'enregistrement du pseudo Twitch`)
  }
}

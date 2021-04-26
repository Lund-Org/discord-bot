import { Message } from "discord.js"
import { getRepository } from "typeorm"
import { Player } from '../../../database/entities/Player'
import { userNotFound } from './helper'

function getTwitchUsername({ msg, cmd }: {
  msg: Message;
  cmd: string[];
}): string|null {
  const [commandBuy, ...args] = cmd

  if (args.length === 1 && args[0].match(/^\w+$/)) {
    return args[0];
  }

  msg.channel.send('Erreur, le format est : "!!gacha twitch pseudo_twitch"')
  return null
}

export const twitch = async ({ msg, cmd }: { msg: Message; cmd: string[] }) => {
  const player = await userNotFound({ msg })

  if (!player) {
    return
  }

  const twitchUsername = await getTwitchUsername({ msg, cmd })

  if (twitchUsername === null) {
    return
  }

  player.twitch_username = twitchUsername.toLowerCase()
  
  try {
    await getRepository(Player).save(player);
    msg.channel.send(`Pseudo twitch attaché`);
  } catch (e) {
    msg.channel.send(`Une erreur s'est produite lors de l'enregistrement du pseudo Twitch`);
  }
}

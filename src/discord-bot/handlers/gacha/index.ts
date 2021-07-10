import { Client, Message } from 'discord.js'
import { userNotFound } from './helper'
import { buy } from './buy'
import { cards } from './cards'
import { daily } from './daily'
import { fusion } from './fusion'
import { gold } from './gold'
import { help } from './help'
import { join } from './join'
import { points } from './points'
import { profile } from './profile'
import { twitch } from './twitch'
import { view } from './view'
import { getManager } from 'typeorm'
import { sell } from './sell'

const commands: Record<string, Function> = {
  buy: buy,
  cards: cards,
  daily: daily,
  fusion: fusion,
  gold: gold,
  help: help,
  join: join,
  points: points,
  profile: profile,
  sell: sell,
  twitch: twitch,
  view: view,
}

function splitArgs(cmd: string) {
  return cmd.split(' ').map((x: string) => x.trim())
}

export const gacha = (client: Client, msg: Message, gachaCmd: string|null): void => {
  let cmd = gachaCmd ? splitArgs(gachaCmd) : null;

  if (!gachaCmd || !commands[cmd[0]]) {
    msg.channel.send("La commande n'existe pas. Voici les commandes possibles :")
    cmd = ['help']
  }

  commands[cmd[0]]({ client, msg, cmd })
}

export const addPoints = async ({ msg }: { msg: Message }) => {
  const entityManager = getManager()
  const player = await userNotFound({ msg, withWarning: false })
  const delay = 60 * 1000 // one minute

  // if last message is in less than 1 minute
  if (player && Date.now() - player.lastMessageDate.getTime() > delay) {
    player.points += 50
    player.lastMessageDate = new Date()
    await entityManager.save(player);
  }
}

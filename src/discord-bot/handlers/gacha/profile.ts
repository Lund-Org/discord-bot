import { Message } from "discord.js"
import { userNotFound } from './helper'
import { getGlobalRanking } from "../../../common/rank"

export const profile = async ({ msg }: { msg: Message }) => {
  const player = await userNotFound({
    msg, relations: [
      'inventories',
      'inventories.cardType',
    ] })

  if (!player) {
    return
  }

  const [rank] = await getGlobalRanking([player.id])

  msg.channel.send(`Tu es niveau ${rank.level.currentLevel} avec ${rank.currentXP}xp. Le prochain niveau est obtenable avec ${rank.level.xpNextLevel}xp`)
}

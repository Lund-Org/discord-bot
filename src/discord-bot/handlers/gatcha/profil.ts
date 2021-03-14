import { Message } from "discord.js"
import { Config } from "../../../database/entities/Config"
import { getRepository } from "typeorm"
import { userNotFound } from './helper'
import GatchaEnum from "../../enums/GatchaEnum"

type LevelConfig = Record<string, number>
const basicXP = 100
const goldXP = 500

export const profil = async ({ msg }: { msg: Message }) => {
  const player = await userNotFound({
    msg, relations: [
      'inventories',
      'inventories.cardType',
    ] })

  if (!player) {
    return
  }

  const configLevelsJSON = await getRepository(Config).findOne({
    where: { name: GatchaEnum.LEVELS }
  })
  const levelConfig: LevelConfig = configLevelsJSON.value as LevelConfig
  const xp = player.inventories.reduce((acc, inventoryItem) => {
    let xpPerCard
    
    if (inventoryItem.total === 0) {
      xpPerCard = 0
    } else if (inventoryItem.type === 'gold') {
      xpPerCard = goldXP
    } else {
      xpPerCard = basicXP
    }

    return acc + xpPerCard * inventoryItem.cardType.level
  }, 0)
  const level = Object.values(levelConfig).reduce((acc, val: number, index: number) => {
    if (val <= xp) {
      return {
        currentLevel: index + 1,
        xpNextLevel: Object.values(levelConfig).length === index + 1 ? 0 : Object.values(levelConfig)[index + 1]
      }
    }

    return acc
  }, { currentLevel: 1, xpNextLevel: 0 })

  msg.channel.send(`Tu es niveau ${level.currentLevel} avec ${xp}xp. Le prochain niveau est obtenable avec ${level.xpNextLevel}xp`)
}

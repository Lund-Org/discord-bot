import { getManager, getRepository } from "typeorm"
import { Config } from "../database/entities/Config"
import { GachaConfigEnum } from "../discord-bot/enums/GachaEnum"

type XpByUser = {
  playerId: number;
  currentXP: number;
  id: number;
  discord_id: string;
  twitch_username: string|null;
  points: number;
  lastMessageDate: Date;
  lastDailyDraw: Date | null;
  joinDate: Date;
}
type RankByUser = {
  level: { currentLevel: number; xpNextLevel: number };
} & XpByUser

const basicXP = 100
const goldXP = 500

export async function getGlobalRanking(userToFilter: number[] = []): Promise<RankByUser[]> {
  const xpByUsers = await getManager().query(`
    SELECT
      t1.playerId,
      SUM(t1.price * t1.level) AS currentXP,
      player.*
    FROM (
      SELECT
        player_inventory.playerId,
        player_inventory.cardTypeId,
        player_inventory.type,
        CASE WHEN player_inventory.type = "gold" THEN ${goldXP} ELSE ${basicXP} END AS price,
        card_type.level
      FROM player_inventory
      LEFT JOIN card_type ON card_type.id = player_inventory.cardTypeId
      ${userToFilter.length ? `WHERE player_inventory.playerId IN (${userToFilter.join(', ')})` : ''}
      GROUP BY playerId, cardTypeId, type
    ) as t1
    LEFT JOIN player on player.id = t1.playerId
    GROUP BY playerId
    ORDER BY currentXP DESC
  `) as XpByUser[]
  const configLevelsJSON = await getRepository(Config).findOne({
    where: { name: GachaConfigEnum.LEVELS }
  })
  const levelConfig: Record<string, number> = configLevelsJSON.value as Record<string, number>

  return xpByUsers.map((xpByUser: XpByUser) => {
    const level = Object.values(levelConfig).reduce((acc, val: number, index: number) => {
      if (val <= xpByUser.currentXP) {
        return {
          currentLevel: index + 1,
          xpNextLevel: Object.values(levelConfig).length === index + 1 ? 0 : Object.values(levelConfig)[index + 1]
        }
      }

      return acc
    }, { currentLevel: 1, xpNextLevel: 0 })

    return { ...xpByUser, level }
  })
}

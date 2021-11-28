import { Player } from '../database/entities/Player'
import { getRepository } from "typeorm"

export const givenPointsForBirthday = 6000

export async function giftPointsForBirthday(discord_id: string): Promise<boolean> {
  const player = await getRepository(Player).findOne({ discord_id })

  if (player) {
    // to handle concurrency
    await player.addPoints(givenPointsForBirthday)
    return true
  }
  return false
}

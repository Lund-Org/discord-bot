import { Player } from '../database/entities/Player'
import { getManager, getRepository } from "typeorm"

export const givenPointsForBirthday = 6000

export async function giftPointsForBirthday(discord_id: string) {
  const player = await getRepository(Player).findOne({ discord_id })

  if (player) {
    // to handle concurrency
    await getManager().query(
      `UPDATE player SET points = points + ${givenPointsForBirthday} WHERE id = ?`,
      [player.id]
    )
  }
}

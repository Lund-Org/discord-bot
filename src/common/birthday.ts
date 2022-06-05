import DataStore from './dataStore';
import { Player } from '../database/entities/Player';

export const givenPointsForBirthday = 6000;

export async function giftPointsForBirthday(
  discord_id: string,
): Promise<boolean> {
  const player = await DataStore.getDB()
    .getRepository(Player)
    .findOne({ where: { discord_id } });

  if (player) {
    // to handle concurrency
    await player.addPoints(givenPointsForBirthday);
    return true;
  }
  return false;
}

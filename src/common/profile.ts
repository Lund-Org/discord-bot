import { getRepository } from "typeorm"
import { Player } from '../database/entities/Player'
import { PlayerInventory } from '../database/entities/PlayerInventory';

export async function getProfile(discord_id: string): Promise<Player|null> {
  try {
    let player = await getRepository(Player)
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.inventories', 'inventories')
      .leftJoinAndSelect('inventories.cardType', 'cardType')
      .where('player.discord_id = :discord_id', { discord_id })
      .andWhere('inventories.total > 0')
      .orderBy('cardType.id', 'ASC')
      .getOne()

    if (!player) {
      player = await getRepository(Player).findOne({ discord_id })
      player.inventories = [];
    }

    return player;
  } catch(e) {
    console.log(e)
    return null
  }
}

export async function getCardsToGold(discord_id: string): Promise<PlayerInventory[]> {
  try {
    return getRepository(PlayerInventory)
      .createQueryBuilder('player_inventories')
      .leftJoinAndSelect('player_inventories.player', 'player')
      .leftJoinAndSelect('player_inventories.cardType', 'cardType')
      .where('player.discord_id = :discord_id', { discord_id })
      .andWhere('player_inventories.total >= 5')
      .andWhere('player_inventories.type = "basic"')
      .orderBy('cardType.id', 'ASC')
      .getMany()
  } catch(e) {
    console.log(e)
    return []
  }
}

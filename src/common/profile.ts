import { MoreThanOrEqual } from 'typeorm';
import { CardType } from '../database/entities/CardType';
import { Player } from '../database/entities/Player';
import { PlayerInventory } from '../database/entities/PlayerInventory';
import DataStore from './dataStore';

export async function getProfile(discord_id: string): Promise<Player | null> {
  try {
    let player = await DataStore.getDB()
      .getRepository(Player)
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.inventories', 'inventories')
      .leftJoinAndSelect('inventories.cardType', 'cardType')
      .where('player.discord_id = :discord_id', { discord_id })
      .andWhere('inventories.total > 0')
      .orderBy('cardType.id', 'ASC')
      .getOne();

    if (!player) {
      player = await DataStore.getDB()
        .getRepository(Player)
        .findOne({ where: { discord_id } });

      if (player) {
        player.inventories = [];
      }
    }

    return player;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getCardsToGold(
  discord_id: string,
): Promise<PlayerInventory[]> {
  try {
    return DataStore.getDB()
      .getRepository(PlayerInventory)
      .find({
        relations: {
          player: true,
          cardType: true,
        },
        where: {
          player: { discord_id },
          type: 'basic',
          total: MoreThanOrEqual(5),
        },
        order: { cardType: { id: 'ASC' } },
      });
  } catch (e) {
    console.log(e);
    return [];
  }
}
export async function getCardsToFusion(
  discord_id: string,
): Promise<CardType[]> {
  try {
    const fusionCards = await DataStore.getDB()
      .getRepository(CardType)
      .find({
        where: { isFusion: true },
        relations: ['fusionDependencies'],
      });
    const inventoryCards = await DataStore.getDB()
      .getRepository(PlayerInventory)
      .find({
        relations: {
          player: true,
          cardType: true,
        },
        where: {
          player: { discord_id },
          type: 'basic',
        },
      });

    return fusionCards.reduce((accumulator, fusionCard) => {
      const depsIds = fusionCard.fusionDependencies.map((f) => f.id);
      const hasAllDeps = depsIds.every((depId) => {
        return inventoryCards.find(
          (inventoryCard) =>
            inventoryCard.cardType.id === depId && inventoryCard.total > 0,
        );
      });

      return hasAllDeps ? [...accumulator, fusionCard] : accumulator;
    }, []);
  } catch (e) {
    console.log(e);
    return [];
  }
}

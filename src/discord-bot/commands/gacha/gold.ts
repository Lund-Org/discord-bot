import { CacheType, CommandInteraction } from 'discord.js';
import { Player } from '../../../database/entities/Player';
import { CardType } from '../../../database/entities/CardType';
import { PlayerInventory } from '../../../database/entities/PlayerInventory';
import { userNotFound } from './helper';
import DataStore from '../../../common/dataStore';

async function createOrUpdateGold(
  player: Player,
  cardToGold: CardType,
  inventoryCardGold?: PlayerInventory,
) {
  const entityManager = DataStore.getDB().manager;

  if (inventoryCardGold) {
    inventoryCardGold.total += 1;
    await entityManager.save(inventoryCardGold);
  } else {
    const playerInventory = new PlayerInventory();

    playerInventory.player = player;
    playerInventory.total = 1;
    playerInventory.type = 'gold';
    playerInventory.cardType = cardToGold;
    await entityManager.save(playerInventory);
  }
}

async function decreaseBasic(inventoryCardBasic: PlayerInventory) {
  inventoryCardBasic.total -= 5;
  await DataStore.getDB().manager.save(inventoryCardBasic);
}

export const gold = async (interaction: CommandInteraction<CacheType>) => {
  const player = await userNotFound({
    interaction,
    relations: ['inventories', 'inventories.cardType'],
  });

  if (!player) {
    return;
  }

  await interaction.deferReply();
  const cardToGold = interaction.options.getNumber('id', true);

  const card = await DataStore.getDB()
    .getRepository(CardType)
    .findOne({
      where: {
        id: cardToGold,
      },
    });

  if (!card) {
    return interaction.editReply("La carte n'existe pas");
  }

  const inventoryCardBasic = player.inventories.find((inventory) => {
    return inventory.cardType.id === cardToGold && inventory.type === 'basic';
  });
  const inventoryCardGold = player.inventories.find((inventory) => {
    return inventory.cardType.id === cardToGold && inventory.type === 'gold';
  });

  if (inventoryCardBasic && inventoryCardBasic.total >= 5) {
    await createOrUpdateGold(
      player,
      inventoryCardBasic.cardType,
      inventoryCardGold,
    );
    await decreaseBasic(inventoryCardBasic);
    return interaction.editReply(
      '5 cartes basiques ont été transformée en une carte en or',
    );
  } else if (inventoryCardBasic) {
    return interaction.editReply(
      'Tu ne possèdes pas assez de cartes basic (5 cartes basiques = 1 carte en or)',
    );
  } else {
    return interaction.editReply('Tu ne possèdes pas la carte');
  }
};

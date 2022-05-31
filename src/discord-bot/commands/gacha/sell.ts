import {
  CommandInteraction,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  SelectMenuInteraction,
} from 'discord.js';
import { Config } from '../../../database/entities/Config';
import { getManager, getRepository } from 'typeorm';
import { Player } from '../../../database/entities/Player';
import { userNotFound } from './helper';
import { GachaConfigEnum } from '../../enums/GachaEnum';
import { PlayerInventory } from '../../../database/entities/PlayerInventory';

type SellConfig = { basic: number; gold: number };
type CardRarity = 'basic' | 'gold';
type StructuredData = {
  cardToSell: PlayerInventory;
  quantity: number;
  earningPoints: number;
};

async function securityChecks({
  interaction,
  player,
}: {
  interaction: SelectMenuInteraction;
  player: Player;
}): Promise<StructuredData | null> {
  const configPriceJSON = await getRepository(Config).findOne({
    where: { name: GachaConfigEnum.SELL },
  });
  const priceConfig: SellConfig = configPriceJSON.value as SellConfig;
  const cardInventoryId = parseInt(interaction.values[0], 10);
  const quantity = parseInt(interaction.values[1], 10);
  const cardInPlayerInventory = player.inventories.find(
    (inventoryCard) => inventoryCard.id === cardInventoryId,
  );

  if (!cardInPlayerInventory) {
    await interaction.editReply('Erreur, tu ne possèdes pas la carte');
    return null;
  }
  if (cardInPlayerInventory.total < quantity) {
    await interaction.editReply(
      `Erreur, tu n'as pas assez de cartes (${cardInPlayerInventory.total} possédées)`,
    );
    return null;
  }

  return {
    cardToSell: cardInPlayerInventory,
    quantity,
    earningPoints:
      quantity *
      priceConfig[cardInPlayerInventory.type as CardRarity] *
      cardInPlayerInventory.cardType.level,
  };
}

export const sell = async (interaction: SelectMenuInteraction) => {
  const player = await userNotFound({
    interaction,
    relations: ['inventories', 'inventories.cardType'],
  });

  if (!player) {
    return;
  }

  await interaction.deferReply();
  const data = await securityChecks({ interaction, player });

  if (data === null) {
    return;
  }

  // To handle concurrency
  // @Todo : transaction ?
  await Promise.all([
    getManager().query(
      `UPDATE player_inventory SET total = total - ${data.quantity} WHERE id = ?`,
      [data.cardToSell.id],
    ),
    player.addPoints(data.earningPoints),
  ]);

  return interaction.editReply(`Tu as gagné ${data.earningPoints} points`);
};

export async function sellMenu(interaction: CommandInteraction) {
  const player = await userNotFound({
    interaction,
    relations: ['inventories', 'inventories.cardType'],
  });

  if (!player) {
    return;
  }

  await interaction.deferReply({ ephemeral: true });

  if (!player.inventories.length) {
    return interaction.editReply('Tu ne possèdes aucune carte');
  }

  const getHigherQuantity = player.inventories.reduce((acc, inventoryItem) => {
    return inventoryItem.total > acc ? inventoryItem.total : acc;
  }, 1);
  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId('sell')
      .setPlaceholder('Selectionner')
      .addOptions(
        player.inventories.map((cardInventory): MessageSelectOptionData => {
          return {
            label: `#${cardInventory.cardType.id} - ${cardInventory.cardType.name} ${cardInventory.type} (qty: ${cardInventory.total})`,
            value: String(cardInventory.id),
          };
        }),
      )
      .addOptions(
        Array.from(Array(getHigherQuantity)).map(
          (qty): MessageSelectOptionData => {
            return {
              label: String(qty + 1),
              value: String(qty + 1),
            };
          },
        ),
      ),
  );

  return interaction.editReply({
    content: 'Choisissez la carte que vous voulez vendre et en quelle quantité',
    components: [row],
  });
}

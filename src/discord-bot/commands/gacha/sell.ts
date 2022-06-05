import { CacheType, CommandInteraction } from 'discord.js';
import { Config } from '../../../database/entities/Config';
import { Player } from '../../../database/entities/Player';
import { userNotFound } from './helper';
import { GachaConfigEnum } from '../../enums/GachaEnum';
import { PlayerInventory } from '../../../database/entities/PlayerInventory';
import DataStore from '../../../common/dataStore';
import { CardType } from '../../../database/entities/CardType';

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
  interaction: CommandInteraction<CacheType>;
  player: Player;
}): Promise<StructuredData | null> {
  const configPriceJSON = await DataStore.getDB()
    .getRepository(Config)
    .findOne({
      where: { name: GachaConfigEnum.SELL },
    });
  const cardType = interaction.options.getString('type', true);
  const cardId = interaction.options.getNumber('id', true);
  const quantity = interaction.options.getNumber('quantity', true);

  if (quantity <= 0) {
    await interaction.editReply(
      'Erreur, la quantité doit être un nombre supérieur à 0',
    );
    return null;
  }

  const card = await DataStore.getDB()
    .getRepository(CardType)
    .findOne({
      where: {
        id: cardId,
      },
    });
  if (!card) {
    await interaction.editReply("Erreur, la carte n'existe pas");
    return null;
  }
  const cardInPlayerInventory = await DataStore.getDB()
    .getRepository(PlayerInventory)
    .findOne({
      relations: {
        cardType: true,
      },
      where: {
        player: { id: player.id },
        cardType: { id: card.id },
        type: cardType,
      },
    });
  const priceConfig: SellConfig = configPriceJSON?.value as SellConfig;

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

export const sell = async (interaction: CommandInteraction<CacheType>) => {
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
    DataStore.getDB().manager.query(
      `UPDATE player_inventory SET total = total - ${data.quantity} WHERE id = ?`,
      [data.cardToSell.id],
    ),
    player.addPoints(data.earningPoints),
  ]);

  return interaction.editReply(`Tu as gagné ${data.earningPoints} points`);
};

import { CommandInteraction, MessageAttachment } from 'discord.js';
import { Config } from '../../../database/entities/Config';
import { getRepository } from 'typeorm';
import { Player } from '../../../database/entities/Player';
import {
  addCardsToInventory,
  drawCards,
  generateDrawImage,
  userNotFound,
} from './helper';
import { GachaConfigEnum } from '../../enums/GachaEnum';

type PriceConfig = { price: number };

async function securityChecks({
  interaction,
  player,
}: {
  interaction: CommandInteraction;
  player: Player;
}): Promise<{ cardNumberToBuy: number; totalPrice: number } | null> {
  const configPriceJSON = await getRepository(Config).findOne({
    where: { name: GachaConfigEnum.PRICE },
  });
  const priceConfig: PriceConfig = configPriceJSON.value as PriceConfig;
  const cardNumberToBuy = interaction.options.getNumber('quantity', true);

  if (cardNumberToBuy < 1 || cardNumberToBuy > 6) {
    await interaction.editReply(
      'Erreur, le nombre de cartes achetable doit être entre 1 et 6',
    );
    return null;
  }

  if (player.points < cardNumberToBuy * priceConfig.price) {
    await interaction.editReply(
      `Tu n'as pas assez de points (points actuels : ${
        player.points
      }, points nécessaires : ${cardNumberToBuy * priceConfig.price})`,
    );
    return null;
  }

  return {
    cardNumberToBuy,
    totalPrice: cardNumberToBuy * priceConfig.price,
  };
}

export const buy = async (interaction: CommandInteraction) => {
  const player = await userNotFound({
    interaction,
    relations: ['inventories', 'inventories.cardType'],
  });

  if (!player) {
    return;
  }

  await interaction.deferReply();
  const cardToDraw = await securityChecks({ interaction, player });

  if (cardToDraw === null) {
    return;
  }

  const cards = await drawCards(cardToDraw.cardNumberToBuy);
  const canvas = await generateDrawImage(interaction.user.username, cards);
  const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png');

  await addCardsToInventory(player, cards, cardToDraw.totalPrice);
  return interaction.editReply({
    content: `Les ${cardToDraw.cardNumberToBuy} cartes que tu as acheté`,
    files: [attachment],
  });
};

import { CommandInteraction, MessageAttachment } from 'discord.js';
import { getConnection } from 'typeorm';
import { Player } from '../../../database/entities/Player';
import {
  addCardsToInventory,
  drawCards,
  generateDrawImage,
  userNotFound,
} from './helper';

function hasAlreadyDrawAvailable(player: Player): boolean {
  const beginningOfTheDay = new Date();
  beginningOfTheDay.setHours(0, 0, 0, 0);

  return player.lastDailyDraw
    ? player.lastDailyDraw.getTime() <= beginningOfTheDay.getTime()
    : true;
}

async function setDailyDraw(date: Date, playerId: number) {
  return getConnection()
    .createQueryBuilder()
    .update(Player)
    .set({ lastDailyDraw: date })
    .where('id = :id', { id: playerId })
    .execute();
}

export const daily = async (interaction: CommandInteraction) => {
  const player = await userNotFound({
    interaction,
    relations: ['inventories', 'inventories.cardType'],
  });
  const dailyDrawDate = new Date();

  if (!player) {
    return;
  }

  await interaction.deferReply();
  const hasAlreadyDraw = hasAlreadyDrawAvailable(player);

  if (hasAlreadyDraw) {
    const cards = await drawCards(1);
    const canvas = await generateDrawImage(interaction.user.username, cards);
    const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png');

    await addCardsToInventory(player, cards, 0);
    await setDailyDraw(dailyDrawDate, player.id);
    interaction.editReply({
      content: `Voici ton tirage quotidien GRA-TUIT`,
      files: [attachment],
    });
  } else {
    interaction.editReply('Tu as déjà fait ton tirage quotidien');
  }
};

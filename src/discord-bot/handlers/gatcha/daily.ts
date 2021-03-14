import { Message, MessageAttachment } from "discord.js"
import { createQueryBuilder, getConnection } from "typeorm";
import { Player } from "../../../database/entities/Player";
import { addCardsToInventory, drawCards, generateDrawImage, userNotFound } from './helper'

async function hasDailyDraw(): Promise<boolean> {
  const beginningOfTheDay = new Date();
  beginningOfTheDay.setHours(0, 0, 0, 0);
  const player = await createQueryBuilder()
    .select('COUNT(player.id) as count, player.id as id')
    .from(Player, 'player')
    .where('player.lastDailyDraw IS NULL')
    .orWhere('player.lastDailyDraw <= :beginningOfTheDay', { beginningOfTheDay})
    .getRawOne()

  return !!parseInt(player.count, 10);
}

async function setDailyDraw (date: Date, playerId: number): Promise<void> {
  await getConnection()
    .createQueryBuilder()
    .update(Player)
    .set({ lastDailyDraw: date })
    .where('id = :id', { id: playerId })
    .execute();
}

export const daily = async ({ msg }: { msg: Message }) => {
  const player = await userNotFound({
    msg, relations: [
      'inventories',
      'inventories.cardType',
    ] })
  const dailyDrawDate = new Date();

  if (!player) {
    return
  }

  const hasAlreadyDraw = await hasDailyDraw();

  if (hasAlreadyDraw) {
    const cards = await drawCards(1)
    const canvas = await generateDrawImage(msg.author.username, cards)
    const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png')

    await addCardsToInventory(player, cards, 0)
    await setDailyDraw(dailyDrawDate, player.id)
    msg.channel.send(`Voici ton tirage quotidien GRA-TUIT`, attachment);
  } else {
    msg.channel.send('Tu as déjà fait ton tirage quotidien')
  }
}

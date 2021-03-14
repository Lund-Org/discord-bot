import { Message, MessageAttachment } from "discord.js"
import { getConnection } from "typeorm";
import { Player } from "../../../database/entities/Player";
import { addCardsToInventory, drawCards, generateDrawImage, userNotFound } from './helper'

function hasAlreadyDrawAvailable(player: Player): boolean {
  const beginningOfTheDay = new Date();
  beginningOfTheDay.setHours(0, 0, 0, 0);
  
  return player.lastDailyDraw ? player.lastDailyDraw.getTime() <= beginningOfTheDay.getTime() : true
}

async function setDailyDraw (date: Date, playerId: number): Promise<void> {
  const a = await getConnection()
    .createQueryBuilder()
    .update(Player)
    .set({ lastDailyDraw: date })
    .where('id = :id', { id: playerId })
    .execute();

  console.log(a)

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

  const hasAlreadyDraw = hasAlreadyDrawAvailable(player);

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

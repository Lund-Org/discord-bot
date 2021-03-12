import { Message } from "discord.js"
import { createQueryBuilder, getConnection } from "typeorm";
import { Player } from "../../../database/entities/Player";
import { userNotFound } from './errors'

async function hasDailyDraw(): Promise<boolean> {
  const beginningOfTheDay = new Date();
  beginningOfTheDay.setHours(0, 0, 0, 0);
  const player = await createQueryBuilder()
    .select('COUNT(player.id) as count, player.id as id')
    .from(Player, 'player')
    .where('player.lastDailyDraw IS NULL')
    .orWhere('player.lastDailyDraw <= :beginningOfTheDay', { beginningOfTheDay})
    .getRawOne()

  return !!parseInt(player.count);
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
  const player = await userNotFound({ msg })
  const dailyDrawDate = new Date();

  if (!player) {
    return
  }

  const hasAlreadyDraw = await hasDailyDraw();

  if (hasAlreadyDraw) {
    // tirage
    await setDailyDraw(dailyDrawDate, player.id);
  } else {
    msg.channel.send('Tu as déjà fait ton tirage quotidien')
  }
}

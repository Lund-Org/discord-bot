import { Message } from "discord.js"
import { getConnection, getRepository } from "typeorm";
import { Player } from "../../../database/entities/Player";

export const join = async ({ msg }: { msg: Message }) => {
  const userId = msg.author.id
  const playerRepository = await getRepository(Player)
  const player = await playerRepository.findOne({ where: { discord_id: userId } })

  if (player) {
    msg.channel.send("Ton compte existe déjà")
    return
  }

  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Player)
      .values([
        {
          discord_id: userId,
          points: 0,
          lastMessageDate: new Date(),
          lastDailyDraw: null,
          joinDate: new Date(),
          inventories: []
        }
      ])
      .execute();
  } catch (e) {
    msg.channel.send("Une erreur est survenue lors de la création du compte")
  }
  
  // draw 8 cards
}

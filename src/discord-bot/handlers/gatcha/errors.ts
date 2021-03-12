import { Message } from "discord.js";
import { getRepository } from "typeorm"
import { Player } from "../../../database/entities/Player";

export const userNotFound = async ({
  msg,
  withWarning = true,
  relations = []
}: { msg: Message; withWarning?: boolean; relations?: string[] }) => {
  const userId = msg.author.id
  const player = await getRepository(Player).findOne({
    where: { discord_id: userId },
    relations
  })

  if (player) {
    return player
  }

  if (withWarning) {
    msg.channel.send(`Avant de pouvoir jouer, crée un compte avec la commande "${process.env.COMMAND_PREFIX}gatcha join"`)
  }
  return null
}

import { Message } from "discord.js"
// import { getConnection, getRepository } from "typeorm";
// import { Player } from "../../../database/entities/Player";
import { userNotFound } from './errors'

export const profil = async ({ msg }: { msg: Message }) => {
  const player = await userNotFound({ msg })

  if (!player) {
    return
  }


}

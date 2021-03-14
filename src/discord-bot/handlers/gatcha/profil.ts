import { Message } from "discord.js"
import { userNotFound } from './helper'

export const profil = async ({ msg }: { msg: Message }) => {
  const player = await userNotFound({ msg })

  if (!player) {
    return
  }


}

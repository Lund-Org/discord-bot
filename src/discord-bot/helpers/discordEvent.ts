import { MessageReaction, User } from "discord.js"
import { Player } from "../../database/entities/Player"
import { Pagination } from "../../database/entities/Pagination"
import { getRepository } from "typeorm"
import { updateMessage } from "../handlers/gatcha/cards"

export const manageGatchaPagination = async (
  pagination: Pagination,
  reaction: MessageReaction,
  user: User
) => {
  const player = await getRepository(Player).findOne({
    where: {
      discord_id: user.id
    },
    relations:['inventories']
  })
  const maxPage = Math.floor(player.inventories.length / 10)

  if (pagination.page === maxPage && reaction.emoji.name === '▶') {
    pagination.page = 0
  } else if (pagination.page === 0 && reaction.emoji.name === '◀') {
    pagination.page = maxPage
  } else if (reaction.emoji.name === '▶') {
    pagination.page += 1
  } else if (reaction.emoji.name === '◀') {
    pagination.page -= 1
  }

  await updateMessage(pagination, reaction, user)
}

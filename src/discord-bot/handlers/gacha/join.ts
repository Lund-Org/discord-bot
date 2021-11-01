import { Message, MessageAttachment } from "discord.js"
import { Birthday } from "../../../database/entities/Birthday"
import { getManager, getRepository } from "typeorm"
import { Player } from "../../../database/entities/Player"
import { addCardsToInventory, drawCards, generateDrawImage } from "./helper"
import { givenPointsForBirthday } from "../../../common/birthday"

async function hasBirthdayAndBeforeDate(discordId: string) {
  const birthday = await getRepository(Birthday).findOne({ where: { discord_id: discordId }})

  if (!birthday) {
    return false;
  }

  const birthdayThisYear = new Date(
    (new Date()).getFullYear(),
    birthday.birthday_month - 1,
    birthday.birthday_day
  )

  return (birthdayThisYear.getTime() < Date.now())
}

export const join = async ({ msg }: { msg: Message }) => {
  const userId = msg.author.id
  const playerRepository = await getRepository(Player)
  let player = await playerRepository.findOne({ where: { discord_id: userId } })

  if (player) {
    msg.channel.send("Ton compte existe déjà")
    return
  }

  try {
    const entityManager = getManager()
    const birthdayBonus = await hasBirthdayAndBeforeDate(userId)

    player = new Player()
    player.username = msg.author.username
    player.discord_id = userId
    player.points = birthdayBonus ? givenPointsForBirthday : 0
    player.lastMessageDate = new Date()
    player.lastDailyDraw = null
    player.joinDate = new Date()
    player.inventories = []
    await entityManager.save(player)

    const cards = await drawCards(8)
    const canvas = await generateDrawImage(msg.author.username, cards)
    const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png')

    await addCardsToInventory(player, cards, 0)
    msg.channel.send(`Bienvenue dans le gacha, voici tes 8 premières cartes ! ${
      birthdayBonus ? `Ton anniversaire étant passé, tu as gagné ${givenPointsForBirthday} points bonus` : ''
    }`, attachment)
  } catch (e) {
    console.log(e)
    msg.channel.send("Une erreur est survenue lors de la création du compte")
  }
}

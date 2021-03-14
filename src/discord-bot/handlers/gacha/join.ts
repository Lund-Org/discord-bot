import { Message, MessageAttachment } from "discord.js"
import { getManager, getRepository } from "typeorm";
import { Player } from "../../../database/entities/Player";
import { addCardsToInventory, drawCards, generateDrawImage } from "./helper";

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

    player = new Player()
    player.discord_id = userId
    player.points = 0
    player.lastMessageDate = new Date()
    player.lastDailyDraw = null
    player.joinDate = new Date()
    player.inventories = []
    await entityManager.save(player)

    const cards = await drawCards(8)
    const canvas = await generateDrawImage(msg.author.username, cards)
    const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png');

    await addCardsToInventory(player, cards, 0)
    msg.channel.send(`Bienvenue dans le gacha, voici tes 8 premières cartes !`, attachment);
  } catch (e) {
    console.log(e)
    msg.channel.send("Une erreur est survenue lors de la création du compte")
  }
}

import { Message, MessageAttachment } from "discord.js"
import { Brackets, getManager, getRepository } from "typeorm"
import { Gift } from "../../../database/entities/Gift"
import { addCardsToInventory, drawCards, generateDrawImage, userNotFound } from "./helper"

function processGift(gift: Gift) {
  let message = "Tu as récupéré ton cadeau. Il contient :\n";
  const actions = {
    points: 0,
    basicCard: 0,
    goldCard: 0
  }

  gift.bonus.forEach((bonus) => {
    switch (Object.keys(bonus)[0]) {
      case 'points':
        actions.points = bonus.points
        message += `• ${bonus.points} points\n`
        break;
      case 'card':
        actions.basicCard = bonus.card
        message += `• ${bonus.card} carte(s)\n`
        break;
      case 'gold':
        actions.goldCard = bonus.gold
        message += `• ${bonus.gold} carte(s) dorée(s)\n`
        break;
    }
  })

  return { message, actions }
}

/** Method for the config keyword */
async function addPoints(points: number|undefined) {
  return Promise.resolve(points || 0)
}
async function getBasicCards(numberOfCards: number|undefined) {
  return numberOfCards ? drawCards(numberOfCards) : Promise.resolve([])
}
async function getGoldCards(numberOfCards: number | undefined) {
  return numberOfCards ? drawCards(numberOfCards).then((cards) => {
    return cards.map((card) => ({ ...card, isGold: true }))
  }) : Promise.resolve([])
}

/** Command */
export const gift = async ({ msg, cmd }: { msg: Message; cmd: string[] }) => {
  const [commandGift, ...args] = cmd
  const player = await userNotFound({
    msg, relations: [
      'gifts',
      'inventories',
      'inventories.cardType'
    ]
  })

  if (args.length === 1 && args[0].match(/[\w\d]+/)) {
    const code = args[0]
    const gift = await getRepository(Gift).createQueryBuilder('gift')
      .leftJoinAndSelect("gift.players", "players")
      .where('code = :code', { code })
      .andWhere('beginning_datetime < :beginDateTime', { beginDateTime: new Date() })
      .andWhere('end_datetime > :endDateTime', { endDateTime: new Date() })
      .andWhere(
        // Check that the user never get it
        new Brackets((qb) => {
          qb.where('players.id IS NULL')
            .orWhere('players.id <> :player_id', { player_id: player.id })
        })
      )
      .getOne()

    if (!gift) {
      msg.reply('Le cadeau n\'existe pas ou a déjà été récupéré')
      return;
    }

    const { message, actions } = processGift(gift)
    const [pointsToAdd, basicCards, goldCards] = await Promise.all([
      addPoints(actions.points),
      getBasicCards(actions.basicCard),
      getGoldCards(actions.goldCard)
    ])
    const unionCards = [...basicCards, ...goldCards]
    let attachment

    if (unionCards.length) {
      const canvas = await generateDrawImage(msg.author.username, unionCards)
      attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png')
    }

    await Promise.all([
      player.addPoints(pointsToAdd),
      player.saveNewGift(gift),
      addCardsToInventory(player, unionCards, 0)
    ])
    attachment ? msg.channel.send(message, attachment) : msg.channel.send(message)
  } else {
    msg.channel.send('Erreur, le format est : "!!gacha gift <code>')
  }
}

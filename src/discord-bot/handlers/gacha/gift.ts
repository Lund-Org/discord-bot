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
        message += `- ${bonus.points} points`
        break;
      case 'card':
        actions.basicCard = bonus.card
        message += `- ${bonus.card} cartes`
        break;
      case 'gold':
        actions.goldCard = bonus.gold
        message += `- ${bonus.gold} cartes dorées`
        break;
    }
  })

  return { message, actions }
}

/** Method for the config keyword */
async function addPoints(points: number|undefined, playerId: number) {
  return points ? getManager().query(
    `UPDATE player
        SET points = points + ?
        WHERE id = ?`,
    [points, playerId]
  ) : Promise.resolve()
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
    const [_, basicCards, goldCards] = await Promise.all([
      addPoints(actions.points, player.id),
      getBasicCards(actions.basicCard),
      getGoldCards(actions.goldCard)
    ])
    const unionCards = [...basicCards, ...goldCards]

    const canvas = await generateDrawImage(msg.author.username, unionCards)
    const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png')

    await addCardsToInventory(player, unionCards, 0)
    msg.channel.send(message, attachment)
  } else {
    msg.channel.send('Erreur, le format est : "!!gacha gift <code>')
  }
}

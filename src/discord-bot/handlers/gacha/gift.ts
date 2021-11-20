import { Message/*, MessageAttachment*/ } from "discord.js"
import { Brackets, getRepository } from "typeorm"
import { Gift } from "../../../database/entities/Gift"
import { userNotFound } from "./helper"
// import { generateDrawImage } from './helper'

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
    /* process les actions genre:
      Promise.all([
        addPoints(actions.points),
        getCards(actions.basicCard, actions.goldCard)
      ])
    */
  } else {
    msg.channel.send('Erreur, le format est : "!!gacha gift <code>')
  }
}

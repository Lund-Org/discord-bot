import { Message, MessageAttachment } from "discord.js"
import { Config } from "../../../database/entities/Config"
import { getRepository } from "typeorm"
import { Player } from '../../../database/entities/Player'
import { addCardsToInventory, drawCards, generateDrawImage, userNotFound } from './helper'
import { GachaConfigEnum } from "../../enums/GachaEnum"

type PriceConfig = { price: number }

async function securityChecks({ msg, player, cmd }: {
  msg: Message;
  player: Player;
  cmd: string[];
}): Promise<{ cardToBuy: number;totalPrice: number }|null> {
  const configPriceJSON = await getRepository(Config).findOne({
    where: { name: GachaConfigEnum.PRICE }
  })
  const priceConfig: PriceConfig = configPriceJSON.value as PriceConfig
  const [commandBuy, ...args] = cmd

  if (args.length === 1 && args[0].match(/^\d$/)) {
    const cardToBuy = parseInt(args[0], 10)

    if (cardToBuy < 1 || cardToBuy > 6) {
      msg.channel.send('Erreur, le nombre de cartes achetable doit être entre 1 et 6')
      return null
    }

    if (player.points < cardToBuy * priceConfig.price) {
      msg.channel.send(
        `Tu n'as pas assez de points (points actuels : ${
          player.points
        }, points nécessaires : ${cardToBuy * priceConfig.price})`
      )
      return null
    }

    return {
      cardToBuy,
      totalPrice: cardToBuy * priceConfig.price
    }
  }

  msg.channel.send('Erreur, le format est : "!!gacha buy <nombre entre 1 et 6>"')
  return null
}

export const buy = async ({ msg, cmd }: { msg: Message; cmd: string[] }) => {
  const player = await userNotFound({
    msg, relations: [
      'inventories',
      'inventories.cardType',
    ] })

  if (!player) {
    return
  }

  const cardToDraw = await securityChecks({ msg, player, cmd })

  if (cardToDraw === null) {
    return
  }

  const cards = await drawCards(cardToDraw.cardToBuy)
  const canvas = await generateDrawImage(msg.author.username, cards)
  const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png')

  await addCardsToInventory(player, cards, cardToDraw.totalPrice)
  msg.channel.send(`Les ${cardToDraw.cardToBuy} cartes que tu as acheté`, attachment)
}

import { Message } from "discord.js"
import { Config } from "../../../database/entities/Config"
import { getManager, getRepository } from "typeorm"
import { Player } from '../../../database/entities/Player'
import { userNotFound } from './helper'
import GachaEnum from "../../enums/GachaEnum"
import { CardType } from "../../../database/entities/CardType"
import { PlayerInventory } from "../../../database/entities/PlayerInventory"

type SellConfig = { basic: number; gold: number };
type CardRarity = 'basic'|'gold';
type StructuredData = {
  cardToSell: PlayerInventory;
  quantity: number;
  earningPoints: number;
}

async function securityChecks({ msg, player, cmd }: {
  msg: Message;
  player: Player;
  cmd: string[];
}): Promise<StructuredData|null> {
  const configPriceJSON = await getRepository(Config).findOne({
    where: { name: GachaEnum.SELL }
  })
  const priceConfig: SellConfig = configPriceJSON.value as SellConfig
  const [commandSell, ...args] = cmd

  if (args.length === 3 && args[0].match(/^\d$/) && ['basic', 'gold'].includes(args[1]) && args[2].match(/^\d$/)) {
    // does the card exist ?
    const cardId = parseInt(args[0], 10);
    const cardToSell = await getRepository(CardType).findOne({ id: cardId })

    if (!cardToSell) {
      msg.channel.send('Erreur, la carte sélectionnée n\'existe pas')
      return null
    }

    // does the user has the card ?
    const quantity = parseInt(args[2], 10);
    const cardInPlayerInventory = player.inventories.find((inventory) => {
      return inventory.cardType.id === cardId && inventory.type === args[1]
    })

    if (!cardInPlayerInventory) {
      msg.channel.send('Erreur, tu ne possèdes pas la carte')
      return null
    }

    if (cardInPlayerInventory.total < quantity) {
      msg.channel.send(`Erreur, tu n'as pas assez de cartes (${cardInPlayerInventory.total} possédées)`)
      return null
    }

    return {
      cardToSell: cardInPlayerInventory,
      quantity,
      earningPoints: quantity * priceConfig[args[1] as CardRarity] * cardToSell.level
    }
  }

  msg.channel.send('Erreur, le format est : "!!gacha sell <identifiant de la carte> <basic|gold> <quantité à vendre>"')
  return null
}

export const sell = async ({ msg, cmd }: { msg: Message; cmd: string[] }) => {
  const player = await userNotFound({
    msg, relations: [
      'inventories',
      'inventories.cardType',
    ] })

  if (!player) {
    return
  }

  const data = await securityChecks({ msg, player, cmd })

  if (data === null) {
    return
  }

  data.cardToSell.total -= data.quantity;
  player.points += data.earningPoints;

  await getManager().save([
    data.cardToSell,
    player
  ])

  msg.channel.send(`Tu as gagné ${data.earningPoints} points`);
}

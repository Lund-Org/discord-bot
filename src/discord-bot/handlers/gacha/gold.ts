import { Message } from "discord.js"
import { getManager } from "typeorm"
import { Player } from "../../../database/entities/Player"
import { CardType } from "../../../database/entities/CardType"
import { PlayerInventory } from "../../../database/entities/PlayerInventory"
import { userNotFound } from './helper'

async function createOrUpdateGold(player: Player, cardToGold: CardType, inventoryCardGold: PlayerInventory) {
  const entityManager = getManager()

  if (inventoryCardGold) {
    inventoryCardGold.total += 1
    await entityManager.save(inventoryCardGold);
  } else {
    const playerInventory = new PlayerInventory()

    playerInventory.player = player
    playerInventory.total = 1
    playerInventory.type = 'gold'
    playerInventory.cardType = cardToGold
    await entityManager.save(playerInventory);
  }
}

async function decreaseBasic(inventoryCardBasic: PlayerInventory) {
  const entityManager = getManager()

  inventoryCardBasic.total -= 5
  await entityManager.save(inventoryCardBasic);
}

export const gold = async ({ msg, cmd }: { msg: Message; cmd: string[] }) => {
  const [commandGold, ...args] = cmd
  const player = await userNotFound({ msg, relations: ['inventories', 'inventories.cardType'] })

  if (!player) {
    return
  }

  if (args.length === 1 && args[0].match(/^\d+$/)) {
    const cardToGold = parseInt(args[0], 10);
    const inventoryCardBasic = player.inventories.find((inventory) => {
      return inventory.cardType.id === cardToGold && inventory.type === 'basic'
    })
    const inventoryCardGold = player.inventories.find((inventory) => {
      return inventory.cardType.id === cardToGold && inventory.type === 'gold'
    })

    if (inventoryCardBasic && inventoryCardBasic.total >= 5) {
      await createOrUpdateGold(player, inventoryCardBasic.cardType, inventoryCardGold)
      await decreaseBasic(inventoryCardBasic)
      msg.channel.send('5 cartes basiques ont été transformée en une carte en or')
    } else if (inventoryCardBasic) {
      msg.channel.send('Tu ne possèdes pas assez de cartes basic (5 cartes basiques = 1 carte en or)')
    } else {
      msg.channel.send('La carte n\'existe pas')
    }
  } else {
    msg.channel.send('Identifiant de carte incorrect')
  }
}

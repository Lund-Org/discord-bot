import { Message } from "discord.js"
import { CardType } from "../../../database/entities/CardType"
import { Player } from "../../../database/entities/Player"
import { getManager, getRepository } from "typeorm"
import { userNotFound } from './helper'
import { PlayerInventory } from "../../../database/entities/PlayerInventory"

async function createFusionCard(player: Player, cardsRequired: PlayerInventory[], fusionCard: CardType) {
  const entityManager = getManager()
  let fusionInventory = player.inventories.find((x) => x.cardType.id === fusionCard.id && x.type === 'basic')

  cardsRequired.forEach((x) => { x.total -= 1 })

  if (fusionInventory) {
    fusionInventory.total += 1
  } else {
    fusionInventory = new PlayerInventory()
    fusionInventory.player = player
    fusionInventory.total = 1
    fusionInventory.type = 'basic'
    fusionInventory.cardType = fusionCard
  }

  await entityManager.save([
    ...cardsRequired,
    fusionInventory
  ])
}

export const fusion = async ({ msg, cmd }: { msg: Message;cmd: string[] }) => {
  const [commandFusion, ...args] = cmd
  const player = await userNotFound({ msg, relations: [
    'inventories',
    'inventories.cardType',
  ] })

  if (!player) {
    return
  }

  if (args.length === 1 && args[0].match(/^\d+$/)) {
    const cardToCreateId = parseInt(args[0], 10);
    const cardToCreate = await getRepository(CardType).findOne({
      where: { id: cardToCreateId },
      relations: ['fusionDependencies']
    })

    if (!cardToCreate) {
      msg.channel.send('La carte n\'existe pas')
      return;
    }
    if (!cardToCreate.isFusion) {
      msg.channel.send('La carte que tu veux créer n\'est pas une carte fusion')
      return;
    }

    const dependencyIds = cardToCreate.fusionDependencies.map(x => x.id)
    const cardInventoriesRequired = player.inventories.filter((inventory) => {
      return dependencyIds.includes(inventory.cardType.id) && inventory.type === 'basic'
    })
    const missingCards = dependencyIds.reduce((acc: number[], val: number): number[] => {
      const hasInventoryCard = player.inventories.find((x) => val == x.cardType.id && x.type === 'basic' && x.total > 0)
      
      return [
        ...acc,
        ...(hasInventoryCard ? [] : [val])
      ]
    }, [])

    if (missingCards.length === 0) {
      await createFusionCard(player, cardInventoriesRequired, cardToCreate)
      msg.channel.send('Carte fusion créée !')
    } else {
      msg.channel.send(`Tu ne possèdes pas tous les réactifs nécessaires. Cartes manquantes : ${
        missingCards.map((id) => `#${id}`).join(', ')
      }`)
    }
  } else {
    msg.channel.send('Erreur, le format est : "!!gacha fusion <identifiant carte voulue>"')
  }
}

import { Message } from "discord.js"
import { Config } from "../../../database/entities/Config"
import { getRepository } from "typeorm"
import { Player } from '../../../database/entities/Player'
import { userNotFound } from './errors'
import GatchaEnum from "../../enums/GatchaEnum"

type PriceConfig = { price: number };

async function securityChecks({ msg, player, cmd }: {
  msg: Message;
  player: Player;
  cmd: string[];
}): Promise<number|false> {
  const configPriceJSON = await getRepository(Config).findOne({
    where: { name: GatchaEnum.PRICE }
  })
  const priceConfig: PriceConfig = configPriceJSON.value as PriceConfig
  const [commandBuy, ...args] = cmd

  if (args.length === 1 && args[0].match(/\d/)) {
    const cardToBuy = parseInt(args[0]);

    if (cardToBuy < 1 || cardToBuy > 6) {
      msg.channel.send('Erreur, le nombre de cartes achetable doit être entre 1 et 6')
      return false
    }

    if (player.points < cardToBuy * priceConfig.price) {
      msg.channel.send(
        `Tu n'as pas assez de points (points actuels : ${
          player.points
        }, points nécessaires : ${cardToBuy * priceConfig.price})`
      )
      return false
    }

    return cardToBuy
  }

  msg.channel.send('Erreur, le format est : "!!gatcha buy nombre_entre_1_et_6"')
  return false
}

export const buy = async ({ msg, cmd }: { msg: Message; cmd: string[] }) => {
  const player = await userNotFound({ msg })

  if (!player) {
    return
  }

  const cardToDraw = await securityChecks({ msg, player, cmd })

  if (cardToDraw === false) {
    return
  }

  // draw X cards
}

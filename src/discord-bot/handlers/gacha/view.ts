import { Message, MessageAttachment } from "discord.js"
import { getRepository } from "typeorm"
import { CardType } from "../../../database/entities/CardType"
import { generateDrawImage } from './helper'

export const view = async ({ msg, cmd }: { msg: Message; cmd: string[] }) => {
  const [commandView, ...args] = cmd

  if (args.length === 1 && args[0].match(/\d+/)) {
    const cardToCreateId = parseInt(args[0], 10)

    const cardToCreate = await getRepository(CardType).findOne({
      where: { id: cardToCreateId },
      relations: ['fusionDependencies']
    })
    if (cardToCreate) {
      const canvas = await generateDrawImage(msg.author.username, [{ cardType: cardToCreate, isGold: false }])
      const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png')

      msg.channel.send({
        files: [attachment]
      })
    } else {
      msg.channel.send('La carte n\'existe pas')
    }
  } else {
    msg.channel.send('Identifiant de carte incorrect')
  }
}

import { CommandInteraction, Message, MessageAttachment } from "discord.js"
import { getRepository } from "typeorm"
import { CardType } from "../../../database/entities/CardType"
import { generateDrawImage } from './helper'

export const view = async (interaction: CommandInteraction) => {
  const cardToCreateId = interaction.options.getNumber('id', true);

  await interaction.deferReply()
  const cardToCreate = await getRepository(CardType).findOne({
    where: { id: cardToCreateId },
    relations: ['fusionDependencies']
  })
  if (cardToCreate) {
    const canvas = await generateDrawImage(interaction.user.username, [{ cardType: cardToCreate, isGold: false }])
    const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png')

    return interaction.editReply({
      files: [attachment]
    })
  } else {
    return interaction.editReply('La carte n\'existe pas')
  }
}

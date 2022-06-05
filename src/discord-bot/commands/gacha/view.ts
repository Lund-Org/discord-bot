import { CacheType, CommandInteraction, MessageAttachment } from 'discord.js';
import DataStore from '../../../common/dataStore';
import { CardType } from '../../../database/entities/CardType';
import { generateDrawImage } from './helper';

export const view = async (interaction: CommandInteraction<CacheType>) => {
  const cardToCreateId = interaction.options.getNumber('id', true);

  await interaction.deferReply();
  const cardToCreate = await DataStore.getDB()
    .getRepository(CardType)
    .findOne({
      where: { id: cardToCreateId },
      relations: ['fusionDependencies'],
    });
  if (cardToCreate) {
    const canvas = await generateDrawImage(interaction.user.username, [
      { cardType: cardToCreate, isGold: false },
    ]);
    const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png');

    return interaction.editReply({
      files: [attachment],
    });
  } else {
    return interaction.editReply("La carte n'existe pas");
  }
};

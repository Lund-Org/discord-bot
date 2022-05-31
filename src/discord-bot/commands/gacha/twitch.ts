import { CommandInteraction } from 'discord.js';
import { getRepository } from 'typeorm';
import { Player } from '../../../database/entities/Player';
import { userNotFound } from './helper';

export const twitch = async (interaction: CommandInteraction) => {
  const player = await userNotFound({ interaction });

  if (!player) {
    return;
  }

  const twitchUsername = interaction.options.getString('username', true);

  player.twitch_username = twitchUsername.toLowerCase();

  try {
    await getRepository(Player).save(player);
    interaction.reply(`Pseudo twitch attaché`);
  } catch (e) {
    interaction.reply(
      `Une erreur s'est produite lors de l'enregistrement du pseudo Twitch`,
    );
  }
};

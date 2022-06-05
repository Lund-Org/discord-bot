import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction } from 'discord.js';

const CMD_NAME = 'google' as const;

export const googleCmd = new SlashCommandBuilder()
  .setName(CMD_NAME)
  .setDescription('Cherche une info sur internet')
  .addStringOption((option) =>
    option
      .setName('query')
      .setDescription('Ce que vous cherchez')
      .setRequired(true),
  )
  .toJSON();

export const googleResponse = {
  type: CMD_NAME,
  callback: googleCallback,
};

function googleCallback(interaction: CommandInteraction<CacheType>) {
  const query = encodeURI(interaction.options.getString('query', true));

  return interaction.reply(
    `🤖 Voilà les résultats : https://www.google.com/search?q=${query}&oq=${query}`,
  );
}

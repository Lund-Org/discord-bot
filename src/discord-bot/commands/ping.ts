import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction } from 'discord.js';

const CMD_NAME = 'ping' as const;

export const pingCmd = new SlashCommandBuilder()
  .setName(CMD_NAME)
  .setDescription('Joue au ping pong')
  .toJSON();

export const pingResponse = {
  type: CMD_NAME,
  callback: pingCallback,
};

function pingCallback(interaction: CommandInteraction<CacheType>) {
  const botMissChances = Math.round(Math.random() * 100);
  const missChances = Math.round(Math.random() * 100);

  if (!missChances) {
    return interaction.reply('Toc toc toc toc.... FAUTE ! 😡');
  } else if (!botMissChances) {
    return interaction.reply('P.... dans le filet... Tu as... gagné 😲');
  } else {
    return interaction.reply('pong 🏓');
  }
}

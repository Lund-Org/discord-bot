import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, GuildMember } from 'discord.js';

const CMD_NAME = 'join' as const;

export const joinCmd = new SlashCommandBuilder()
  .setName(CMD_NAME)
  .setDescription("Récupère l'info de quand vous êtes arrivé sur le serveur")
  .toJSON();

export const joinResponse = {
  type: CMD_NAME,
  callback: joinCallback,
};

function joinCallback(interaction: CommandInteraction<CacheType>) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const date: Date = (interaction.member as GuildMember).joinedAt as Date;
  const dateStr = `${date.getDate().toString().padStart(2, '0')}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${date.getFullYear().toString().padStart(2, '0')}`;
  const timeStr = `${date.getHours().toString().padStart(2, '0')}h${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  return interaction.reply(
    `⌚ Tu as rejoint le serveur le ${dateStr} à ${timeStr}`,
  );
}

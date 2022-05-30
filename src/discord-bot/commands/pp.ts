import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

const CMD_NAME = 'pp' as const;

export function ppCmd() {
  return new SlashCommandBuilder()
    .setName(CMD_NAME)
    .setDescription('Affiche la photo de profil d\'un utilisateur')
    .addUserOption((option) =>
      option.setName('user')
        .setDescription('L\'utilisateur ciblé')
        .setRequired(true)
    )
    .toJSON();
}

export const ppResponse = {
  type: CMD_NAME,
  callback: ppCallback
};

function ppCallback(interaction: CommandInteraction) {
  const user = interaction.options.getUser('user', true)

  if (user && user.avatarURL) {
    return interaction.reply(user.displayAvatarURL({ size: 256, dynamic: true }))
  } else if (user) {
    return interaction.reply('Cet utilisateur n\'a pas d\'avatar ☹')
  } else {
    return interaction.reply('Utilisateur non trouvé 🧐')
  }
}

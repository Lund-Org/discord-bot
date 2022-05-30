import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, SelectMenuInteraction } from "discord.js";
import { buy } from "./gacha/buy";
import { daily } from "./gacha/daily";
import { fusion, fusionMenu } from "./gacha/fusion";
import { gift } from "./gacha/gift";
import { gold, goldMenu } from "./gacha/gold";
import { join } from "./gacha/join";
import { profile } from "./gacha/profile";
import { sell, sellMenu } from "./gacha/sell";
import { twitch } from "./gacha/twitch";
import { view } from "./gacha/view";

const CMD_NAME = 'gacha' as const;

export function gachaCmd() {
  return new SlashCommandBuilder()
    .setName(CMD_NAME)
    .setDescription('Commande pour jouer au gacha')
    .addSubcommand(subcommand =>
      subcommand.setName('buy')
        .setDescription('Permet d\'acheter des cartes')
        .addNumberOption((option) =>
          option.setName('quantity')
            .setDescription('Nombre de cartes à acheter')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('daily')
        .setDescription('Récupérer sa carte quotidienne')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('fusion')
        .setDescription('Permet de fusionner des cartes')
      // Menu
    )
    .addSubcommand(subcommand =>
      subcommand.setName('gift')
        .setDescription('Permet de récupérer un cadeau')
        .addStringOption((option) =>
          option.setName('code')
            .setDescription('Code du cadeau')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('gold')
        .setDescription('Permet de transformer des cartes basiques en or')
      // Menu
    )
    .addSubcommand(subcommand =>
      subcommand.setName('join')
        .setDescription('Commande pour créer son compte')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('profile')
        .setDescription('Permet d\'avoir les infos de son profil')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('sell')
        .setDescription('Permet de vendre des cartes')
      // menu
    )
    .addSubcommand(subcommand =>
      subcommand.setName('twitch')
        .setDescription('Permet de lier son compte Twitch au gacha')
        .addStringOption((option) =>
          option.setName('username')
            .setDescription('Nom du compte twitch')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('view')
        .setDescription('Affiche une carte')
        .addNumberOption((option) =>
          option.setName('id')
            .setDescription('Numéro de la carte')
            .setRequired(true)
        )
    )
    .toJSON();
}

export const gachaResponse = {
  type: CMD_NAME,
  callback: gachaCallback
};

function gachaCallback(interaction: CommandInteraction) {
  switch (interaction.options.getSubcommand(true)) {
    case 'buy':
      return buy(interaction);
    case 'daily':
      return daily(interaction);
    case 'fusion':
      return fusionMenu(interaction);
    case 'gift':
      return gift(interaction);
    case 'gold':
      return goldMenu(interaction);
    case 'join':
      return join(interaction);
    case 'profile':
      return profile(interaction);
    case 'sell':
      return sellMenu(interaction);
    case 'twitch':
      return twitch(interaction);
    case 'view':
      return view(interaction);
    default:
      return Promise.resolve();
  }
}

export async function gachaMenuResponse(interaction: SelectMenuInteraction) {
  switch (interaction.customId) {
    case 'fusion':
      return fusion(interaction);
    case 'gold':
      return gold(interaction);
    case 'sell':
      return sell(interaction);
    default:
      return Promise.resolve();
  }
}

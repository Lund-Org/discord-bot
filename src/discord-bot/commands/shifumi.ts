import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import ShifumiEnum from '../enums/ShifumiEnum';

const availableValues = [
  ShifumiEnum.PIERRE,
  ShifumiEnum.FEUILLE,
  ShifumiEnum.CISEAUX,
] as const;
const CMD_NAME = 'shifumi' as const;

export function shifumiCmd() {
  return new SlashCommandBuilder()
    .setName(CMD_NAME)
    .setDescription('Joue à Shifumi avec le bot')
    .addStringOption((option) =>
      option
        .setName('action')
        .setDescription("L'action jouée")
        .setRequired(true)
        .addChoices(
          { name: 'Pierre', value: ShifumiEnum.PIERRE },
          { name: 'Feuille', value: ShifumiEnum.FEUILLE },
          { name: 'Ciseaux', value: ShifumiEnum.CISEAUX },
        ),
    )
    .toJSON();
}

export const shifumiResponse = {
  type: CMD_NAME,
  callback: shifumiCallback,
};

function shifumiCallback(interaction: CommandInteraction) {
  const botChoice: ShifumiEnum = pickRandomChoice();
  const userInput = interaction.options.getString('action', true);

  if (
    (botChoice === ShifumiEnum.PIERRE && userInput === ShifumiEnum.CISEAUX) ||
    (botChoice === ShifumiEnum.CISEAUX && userInput === ShifumiEnum.FEUILLE) ||
    (botChoice === ShifumiEnum.FEUILLE && userInput === ShifumiEnum.PIERRE)
  ) {
    return interaction.reply(
      `J'ai choisi "${botChoice}".... J'ai donc gagné ! 🎉`,
    );
  } else if (botChoice === userInput) {
    return interaction.reply(`J'ai choisi "${botChoice}".... Egalité ! 🤝`);
  } else {
    return interaction.reply(`J'ai choisi "${botChoice}".... T'as gagné ! 😭`);
  }
}

function pickRandomChoice(): ShifumiEnum {
  return availableValues[Math.trunc(availableValues.length * Math.random())];
}

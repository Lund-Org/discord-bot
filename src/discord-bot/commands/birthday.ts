import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction } from 'discord.js';
import DataStore from '../../common/dataStore';
import { Birthday } from '../../database/entities/Birthday';

const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const CMD_NAME = 'birthday' as const;

export const birthdayCmd = new SlashCommandBuilder()
  .setName(CMD_NAME)
  .setDescription("Enregistre sa date d'anniversaire")
  .addNumberOption((option) =>
    option
      .setName('day')
      .setDescription('Le jour de naissance')
      .setRequired(true),
  )
  .addNumberOption((option) => {
    const opt = option
      .setName('month')
      .setDescription('Le mois de naissance')
      .setRequired(true);
    const choices = Array.from(Array(12).keys()).map((n) => ({
      name: months[n],
      value: n + 1,
    }));

    return opt.addChoices(...choices);
  })
  .addNumberOption((option) =>
    option
      .setName('year')
      .setDescription("L'année de naissance")
      .setRequired(true),
  )
  .toJSON();

export const birthdayResponse = {
  type: CMD_NAME,
  callback: birthdayCallback,
};

async function birthdayCallback(interaction: CommandInteraction<CacheType>) {
  const userId = interaction.user.id;
  const birthday =
    (await DataStore.getDB()
      .getRepository(Birthday)
      .findOne({ where: { discord_id: userId } })) || new Birthday();
  const newBirthday = !birthday.discord_id;
  const day = interaction.options.getNumber('day', true);
  const month = interaction.options.getNumber('month', true);
  const year = interaction.options.getNumber('year', true);

  if (newBirthday) {
    birthday.discord_id = userId;
  }
  birthday.birthday_day = day;
  birthday.birthday_month = month;
  birthday.birthday_year = year;

  if (!checkValidDate(day, month, year)) {
    return interaction.reply(`La date est invalide`);
  }

  try {
    await DataStore.getDB().getRepository(Birthday).save(birthday);
    interaction.reply(`Anniversaire enregistré !`);
    if (newBirthday) {
      await this.backportThisYearPoints(day, month, userId);
    }
  } catch (e) {
    interaction.reply(
      `Une erreur est arrivée lors de la sauvegarde de l'anniversaire`,
    );
  }
}

function checkValidDate(day: number, month: number, year: number) {
  const date = new Date(year, month - 1, day);

  return (
    date instanceof Date &&
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}

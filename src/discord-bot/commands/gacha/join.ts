import { CommandInteraction, MessageAttachment } from 'discord.js';
import { Birthday } from '../../../database/entities/Birthday';
import { getManager, getRepository } from 'typeorm';
import { Player } from '../../../database/entities/Player';
import { addCardsToInventory, drawCards, generateDrawImage } from './helper';
import { givenPointsForBirthday } from '../../../common/birthday';

async function hasBirthdayAndBeforeDate(discordId: string) {
  const birthday = await getRepository(Birthday).findOne({
    where: { discord_id: discordId },
  });

  if (!birthday) {
    return false;
  }

  const birthdayThisYear = new Date(
    new Date().getFullYear(),
    birthday.birthday_month - 1,
    birthday.birthday_day,
  );

  return birthdayThisYear.getTime() < Date.now();
}

export const join = async (interaction: CommandInteraction) => {
  const userId = interaction.user.id;
  const playerRepository = await getRepository(Player);
  let player = await playerRepository.findOne({
    where: { discord_id: userId },
  });

  if (player) {
    return interaction.reply('Ton compte existe déjà');
  }

  await interaction.deferReply();
  try {
    const entityManager = getManager();
    const birthdayBonus = await hasBirthdayAndBeforeDate(userId);

    player = new Player();
    player.username = interaction.user.username;
    player.discord_id = userId;
    player.points = birthdayBonus ? givenPointsForBirthday : 0;
    player.lastMessageDate = new Date();
    player.lastDailyDraw = null;
    player.joinDate = new Date();
    player.inventories = [];
    await entityManager.save(player);

    const cards = await drawCards(8);
    const canvas = await generateDrawImage(interaction.user.username, cards);
    const attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png');

    await addCardsToInventory(player, cards, 0);
    return interaction.editReply({
      content: `Bienvenue dans le gacha, voici tes 8 premières cartes ! ${
        birthdayBonus
          ? `Ton anniversaire étant passé, tu as gagné ${givenPointsForBirthday} points bonus`
          : ''
      }`,
      files: [attachment],
    });
  } catch (e) {
    console.log(e);
    return interaction.editReply(
      'Une erreur est survenue lors de la création du compte',
    );
  }
};

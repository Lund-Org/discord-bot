import { CommandInteraction } from 'discord.js';
import { userNotFound } from './helper';
import { getGlobalRanking } from '../../../common/rank';

export const profile = async (interaction: CommandInteraction) => {
  const player = await userNotFound({
    interaction,
    relations: ['inventories', 'inventories.cardType'],
  });

  if (!player) {
    return;
  }

  const [rank] = await getGlobalRanking([player.id]);

  return interaction.reply(
    `Tu es niveau ${rank.level.currentLevel} avec ${rank.currentXP}xp. Le prochain niveau est obtenable avec ${rank.level.xpNextLevel}xp. Tu peux retrouver plus d'informations ici : https://lundprod.com/profile/${interaction.user.id}`,
  );
};

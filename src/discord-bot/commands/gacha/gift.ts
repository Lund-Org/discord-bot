import { CacheType, CommandInteraction, MessageAttachment } from 'discord.js';
import DataStore from '../../../common/dataStore';
import { Gift } from '../../../database/entities/Gift';
import {
  addCardsToInventory,
  drawCards,
  generateDrawImage,
  userNotFound,
} from './helper';

function processGift(gift: Gift) {
  let message = 'Tu as récupéré ton cadeau. Il contient :\n';
  const actions = {
    points: 0,
    basicCard: 0,
    goldCard: 0,
  };

  gift.bonus.forEach((bonus) => {
    switch (Object.keys(bonus)[0]) {
      case 'points':
        actions.points = bonus.points;
        message += `• ${bonus.points} points\n`;
        break;
      case 'card':
        actions.basicCard = bonus.card;
        message += `• ${bonus.card} carte(s)\n`;
        break;
      case 'gold':
        actions.goldCard = bonus.gold;
        message += `• ${bonus.gold} carte(s) dorée(s)\n`;
        break;
    }
  });

  return { message, actions };
}

/** Method for the config keyword */
async function addPoints(points: number | undefined) {
  return Promise.resolve(points || 0);
}
async function getBasicCards(numberOfCards: number | undefined) {
  return numberOfCards ? drawCards(numberOfCards) : Promise.resolve([]);
}
async function getGoldCards(numberOfCards: number | undefined) {
  return numberOfCards
    ? drawCards(numberOfCards).then((cards) => {
        return cards.map((card) => ({ ...card, isGold: true }));
      })
    : Promise.resolve([]);
}

/** Command */
export const gift = async (interaction: CommandInteraction<CacheType>) => {
  const code = interaction.options.getString('code', true);
  const player = await userNotFound({
    interaction,
    relations: ['gifts', 'inventories', 'inventories.cardType'],
  });

  if (!player) {
    return;
  }

  await interaction.deferReply();
  const foundGift = await DataStore.getDB()
    .getRepository(Gift)
    .createQueryBuilder('gift')
    .where('code = :code', { code })
    .andWhere('beginning_datetime < :beginDateTime', {
      beginDateTime: new Date(),
    })
    .andWhere('end_datetime > :endDateTime', { endDateTime: new Date() })
    .getOne();

  if (!foundGift) {
    return interaction.editReply(
      "Le cadeau n'existe pas ou tu n'es pas dans sa période de validité",
    );
  }

  const hasGift = await DataStore.getDB()
    .getRepository(Gift)
    .createQueryBuilder('gift')
    .leftJoinAndSelect('gift.players', 'players')
    .where('gift.id = :gift_id', { gift_id: foundGift.id })
    .andWhere('players.id = :player_id', { player_id: player.id })
    .getOne();

  if (hasGift) {
    return interaction.editReply('Le cadeau a déjà été récupéré');
  }

  const { message, actions } = processGift(foundGift);
  const [pointsToAdd, basicCards, goldCards] = await Promise.all([
    addPoints(actions.points),
    getBasicCards(actions.basicCard),
    getGoldCards(actions.goldCard),
  ]);
  const unionCards = [...basicCards, ...goldCards];
  let attachment;

  if (unionCards.length) {
    const canvas = await generateDrawImage(
      interaction.user.username,
      unionCards,
    );
    attachment = new MessageAttachment(canvas.toBuffer(), 'cards.png');
  }

  await Promise.all([
    player.addPoints(pointsToAdd),
    player.saveNewGift(foundGift),
    addCardsToInventory(player, unionCards, 0),
  ]);
  return attachment
    ? interaction.editReply({
        content: message,
        files: [attachment],
      })
    : interaction.editReply(message);
};

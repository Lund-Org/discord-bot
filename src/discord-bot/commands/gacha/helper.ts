import {
  CacheType,
  CommandInteraction,
  SelectMenuInteraction,
} from 'discord.js';
import { GachaConfigEnum } from '../../enums/GachaEnum';
import { Player } from '../../../database/entities/Player';
import { PlayerInventory } from '../../../database/entities/PlayerInventory';
import { Config } from '../../../database/entities/Config';
import { CardType } from '../../../database/entities/CardType';
import {
  HEIGHT_HEADER,
  MARGIN_LEFT_CARD,
  MARGIN_RIGHT_CARD,
  WIDTH_CARD,
  HEIGHT_CARD,
  MARGIN_TOP_CARD,
  MARGIN_BOTTOM_CARD,
  CARDS_PER_ROW,
  CardDraw,
} from '../../helpers/CanvasData';
import { createCanvas } from 'canvas';
import { setupCardDrawBody, setupCardDrawHeader } from '../../helpers/canvas';
import DataStore from '../../../common/dataStore';

type ChancesConfig = {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
};

export const userNotFound = async ({
  interaction,
  withWarning = true,
  relations = [],
}: {
  interaction: CommandInteraction<CacheType> | SelectMenuInteraction<CacheType>;
  withWarning?: boolean;
  relations?: string[];
}) => {
  const userId = interaction.user.id;
  const player = await DataStore.getDB()
    .getRepository(Player)
    .findOne({
      where: { discord_id: userId },
      relations,
    });

  if (player) {
    return player;
  }

  if (withWarning) {
    interaction.reply(
      `Avant de pouvoir jouer, crée un compte avec la commande "/gacha join"`,
    );
  }
  return null;
};

export async function addCardsToInventory(
  player: Player,
  cardsToAdd: CardDraw[],
  totalPrice: number,
) {
  const inventoriesItem: PlayerInventory[] = [];

  cardsToAdd.forEach((cardToAdd) => {
    const type = cardToAdd.isGold ? 'gold' : 'basic';
    let inventory = player.inventories.find(
      (x) => x.cardType.id === cardToAdd.cardType.id && x.type === type,
    );
    const newInventoryItem = inventoriesItem.find(
      (x) => x.cardType.id === cardToAdd.cardType.id && x.type === type,
    );

    if (newInventoryItem) {
      newInventoryItem.total += 1;
    } else if (inventory) {
      inventory.total += 1;
      inventoriesItem.push(inventory);
    } else {
      inventory = new PlayerInventory();
      inventory.player = player;
      inventory.total = 1;
      inventory.type = type;
      inventory.cardType = cardToAdd.cardType;
      inventoriesItem.push(inventory);
    }
  });
  await Promise.all([
    player.addPoints(-totalPrice),
    DataStore.getDB().manager.save(inventoriesItem),
  ]);
}

export const drawCards = async (nbCardToDraw: number): Promise<CardDraw[]> => {
  const chancesJSON = await DataStore.getDB()
    .getRepository(Config)
    .findOne({
      where: { name: GachaConfigEnum.DROP_CHANCES },
    });
  const chancesConfig: ChancesConfig = chancesJSON?.value as ChancesConfig;
  const cardsDraw: CardDraw[] = [];

  for (let i = 0; i < nbCardToDraw; ++i) {
    const chances = Math.floor(Math.random() * 100);
    const loopValues = { currentOffset: 0, foundLevel: '1' };

    Object.keys(chancesConfig).some((configKey: keyof ChancesConfig) => {
      const value: number = chancesConfig[configKey];

      if (chances <= loopValues.currentOffset + value) {
        loopValues.foundLevel = configKey;
        return true;
      }

      loopValues.currentOffset += value;
    });

    const level = parseInt(loopValues.foundLevel, 10);
    const isGold = Math.floor(Math.random() * 100) < 4;
    const randomCard = await DataStore.getDB()
      .manager.createQueryBuilder(CardType, 'cardType')
      .where('cardType.level = :level', { level })
      .andWhere('cardType.isFusion = :fusion', { fusion: false })
      .orderBy('RAND()')
      .getOne();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    cardsDraw.push({ cardType: randomCard!, isGold });
  }

  return cardsDraw;
};

export const generateDrawImage = async (
  username: string,
  cardList: CardDraw[],
) => {
  const numberOfRow = Math.ceil(cardList.length / CARDS_PER_ROW);
  const maxColumn = Math.min(cardList.length, CARDS_PER_ROW);
  const size = {
    width: maxColumn * (MARGIN_LEFT_CARD + MARGIN_RIGHT_CARD + WIDTH_CARD),
    height:
      HEIGHT_HEADER +
      numberOfRow * (MARGIN_TOP_CARD + MARGIN_BOTTOM_CARD + HEIGHT_CARD),
  };
  const canvas = createCanvas(size.width, size.height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size.width, size.height);
  await setupCardDrawHeader(username, ctx);
  await setupCardDrawBody(ctx, cardList);

  return canvas;
};

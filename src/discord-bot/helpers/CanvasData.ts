import { CardType } from '../../database/entities/CardType';

export const MARGIN_LEFT_HEADER = 10;
export const HEIGHT_HEADER = 50;

export const MARGIN_LEFT_CARD = 10;
export const MARGIN_RIGHT_CARD = 10;
export const WIDTH_CARD = 475;
export const HEIGHT_CARD = 775;
export const MARGIN_TOP_CARD = 20;
export const MARGIN_BOTTOM_CARD = 20;

export const CARDS_PER_ROW = 4;

export const INNER_HORIZONTAL_MARGIN = 20;
export const CARD_HEADER = 54;
export const CARD_IMAGE_HEIGHT = 325;
export const CARD_TITLE_HEIGHT = 77;
export const CARD_DESCRIPTION_HEIGHT = 178;

export type CardDraw = {
  cardType: CardType;
  isGold: boolean;
};

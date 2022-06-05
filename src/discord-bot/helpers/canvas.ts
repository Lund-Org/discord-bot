import { loadImage, CanvasRenderingContext2D } from 'canvas';
import {
  MARGIN_LEFT_HEADER,
  HEIGHT_HEADER,
  MARGIN_LEFT_CARD,
  MARGIN_RIGHT_CARD,
  WIDTH_CARD,
  HEIGHT_CARD,
  MARGIN_TOP_CARD,
  MARGIN_BOTTOM_CARD,
  CARDS_PER_ROW,
  INNER_HORIZONTAL_MARGIN,
  CARD_HEADER,
  CARD_IMAGE_HEIGHT,
  CardDraw,
  CARD_TITLE_HEIGHT,
} from './CanvasData';
import { join } from 'path';

function setIdOfCard(
  offsetX: number,
  offsetY: number,
  cardDraw: CardDraw,
  ctx: CanvasRenderingContext2D,
) {
  ctx.font = '35px Sans';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'ideographic';
  ctx.fillStyle = '#000000';
  ctx.fillText(
    `#${cardDraw.cardType.id}`,
    offsetX + WIDTH_CARD - INNER_HORIZONTAL_MARGIN,
    offsetY + 15,
  );
}

async function setImageOfCard(
  offsetX: number,
  offsetY: number,
  cardDraw: CardDraw,
  ctx: CanvasRenderingContext2D,
) {
  try {
    const img = await loadImage(
      join(__dirname, '../../../public/images/', cardDraw.cardType.imageName),
    );
    ctx.drawImage(
      img,
      offsetX + INNER_HORIZONTAL_MARGIN,
      offsetY + CARD_HEADER,
      WIDTH_CARD - INNER_HORIZONTAL_MARGIN,
      CARD_IMAGE_HEIGHT,
    );
  } catch (e) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(
      offsetX + INNER_HORIZONTAL_MARGIN,
      offsetY + CARD_HEADER,
      WIDTH_CARD - INNER_HORIZONTAL_MARGIN,
      CARD_IMAGE_HEIGHT,
    );
  }
}

function setTitleOfCard(
  offsetX: number,
  offsetY: number,
  cardDraw: CardDraw,
  ctx: CanvasRenderingContext2D,
) {
  const title = cardDraw.cardType.name;
  let fontSize = 41;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'ideographic';
  ctx.fillStyle = '#000000';
  ctx.font = `${fontSize}px Sans`;
  while (
    fontSize > 10 &&
    ctx.measureText(title).width > WIDTH_CARD - 2 * INNER_HORIZONTAL_MARGIN
  ) {
    ctx.font = `${fontSize}px Sans`;
    --fontSize;
  }
  ctx.fillText(
    title,
    offsetX + INNER_HORIZONTAL_MARGIN,
    offsetY + CARD_HEADER + CARD_IMAGE_HEIGHT,
  );
}

function setDescriptionOfCard(
  offsetX: number,
  offsetY: number,
  cardDraw: CardDraw,
  ctx: CanvasRenderingContext2D,
) {
  const fragmentedDescription = cardDraw.cardType.description.split(' ');
  let linesInput = 1;
  ctx.font = `35px Sans`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'ideographic';
  ctx.fillStyle = '#000000';

  for (
    let iteration = 10;
    fragmentedDescription.length && iteration > 0;
    --iteration
  ) {
    let quit = false;

    for (
      let wordsTaken = fragmentedDescription.length;
      wordsTaken > 0 && !quit;
      --wordsTaken
    ) {
      const desc = fragmentedDescription.filter(
        (_, index) => index < wordsTaken,
      );

      if (
        ctx.measureText(desc.join(' ')).width <
        WIDTH_CARD - 2 * INNER_HORIZONTAL_MARGIN
      ) {
        ctx.fillText(
          desc.join(' '),
          offsetX + INNER_HORIZONTAL_MARGIN,
          offsetY +
            CARD_HEADER +
            CARD_IMAGE_HEIGHT +
            CARD_TITLE_HEIGHT +
            linesInput * 40,
        );
        fragmentedDescription.splice(0, wordsTaken);
        linesInput += 1;
        quit = true;
      }
    }
  }
}

async function setStarsOfCard(
  offsetX: number,
  offsetY: number,
  cardDraw: CardDraw,
  ctx: CanvasRenderingContext2D,
) {
  const numberOfStars = cardDraw.cardType.level;
  try {
    const starImg = await loadImage(
      join(
        __dirname,
        `../../../public/images/star${cardDraw.isGold ? '-gold' : ''}.png`,
      ),
    );

    for (let i = 0; i < numberOfStars; ++i) {
      ctx.drawImage(
        starImg,
        offsetX +
          WIDTH_CARD / 2 -
          (numberOfStars * starImg.width) / 2 +
          i * starImg.width,
        offsetY + HEIGHT_CARD - starImg.height,
        starImg.width,
        starImg.height,
      );
    }
  } catch (e) {}
}

export const setupCardDrawHeader = async (
  username: string,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.font = '50px Sans';
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'ideographic';
  ctx.fillText(username, MARGIN_LEFT_HEADER, 10);
};

export const setupCardDrawBody = async (
  ctx: CanvasRenderingContext2D,
  cardList: CardDraw[],
) => {
  let offsetY = HEIGHT_HEADER;

  for (let i = 0; i < cardList.length; ) {
    let offsetX = 0;

    for (let j = 0; j < CARDS_PER_ROW && i < cardList.length; ++j, ++i) {
      ctx.fillStyle = cardList[i].isGold ? '#f1b500' : '#dadada';
      ctx.fillRect(
        offsetX + MARGIN_LEFT_CARD,
        offsetY + MARGIN_TOP_CARD,
        WIDTH_CARD,
        HEIGHT_CARD,
      );
      await setIdOfCard(offsetX, offsetY, cardList[i], ctx);
      await setImageOfCard(offsetX, offsetY, cardList[i], ctx);
      await setTitleOfCard(offsetX, offsetY, cardList[i], ctx);
      await setDescriptionOfCard(offsetX, offsetY, cardList[i], ctx);
      await setStarsOfCard(offsetX, offsetY, cardList[i], ctx);
      offsetX += MARGIN_LEFT_CARD + MARGIN_RIGHT_CARD + WIDTH_CARD;
    }

    offsetY += MARGIN_TOP_CARD + MARGIN_BOTTOM_CARD + HEIGHT_CARD;
  }
};

import { Request, Response } from 'express';
import { getCardsToGold as _getCardsToGold } from '../../../common/profile';

export const getCardsToGold = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const cardsToGold = await _getCardsToGold(req.params.id);

  res.json(cardsToGold);
};

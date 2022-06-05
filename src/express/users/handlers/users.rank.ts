import { Request, Response } from 'express';
import { getGlobalRanking } from '../../../common/rank';

export const getUserRank = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.params.id) {
    res.json({ xp: 0 });
  }

  const [rank] = await getGlobalRanking([parseInt(req.params.id, 10)]);

  res.json(rank);
};

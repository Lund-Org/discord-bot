import { Request, Response } from 'express';
import DataStore from '../../../common/dataStore';
import { Like } from 'typeorm';
import { CardType } from '../../../database/entities/CardType';

export const getManyCards = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const filters = {
    where: {} as Record<string, unknown>,
  };

  if (req.query.filters) {
    const filterParams = JSON.parse(req.query.filters.toString());

    if (filterParams.fusion) {
      filters.where.fusion = true;
    }
    if (filterParams.level) {
      filters.where.level = filterParams.level;
    }
    if (filterParams.search) {
      filters.where.name = Like(`%${filterParams.search}%`);
    }
  }

  const cardTypes = await DataStore.getDB()
    .getRepository(CardType)
    .find({
      ...filters,
      relations: ['fusionDependencies'],
    });

  res.json(cardTypes);
};

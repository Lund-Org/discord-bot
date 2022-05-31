import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { CardType } from '../../../database/entities/CardType';

export const getManyCards = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const filters = {
    where: [] as Record<string, unknown>[],
  };

  if (req.query.filters) {
    const filterParams = JSON.parse(req.query.filters.toString());

    if (filterParams.fusion) {
      filters.where.push({ fusion: true });
    }
    if (filterParams.level) {
      filters.where.push({ level: filterParams.level });
    }
    if (filterParams.search) {
      filters.where.push({ name: Like(`%${filterParams.search}%`) });
    }
  }

  const cardTypeRepository = await getRepository(CardType);
  const cardTypes = await cardTypeRepository.find({
    ...filters,
    relations: ['fusionDependencies'],
  });

  res.json(cardTypes);
};

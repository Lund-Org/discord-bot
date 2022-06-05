import { Request, Response } from 'express';
import DataStore from '../../../common/dataStore';
import { Config } from '../../../database/entities/Config';

export const postTwitchToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (req.query.token && req.query.token.length === 30) {
    const existingConfig = await DataStore.getDB()
      .getRepository(Config)
      .findOne({
        where: {
          name: 'TWITCH_TOKENS',
        },
      });
    const tokenConf = existingConfig || new Config();

    tokenConf.name = 'TWITCH_TOKENS';
    tokenConf.value = {
      accessToken: req.query.token,
      refreshToken: null,
      expiryDate: null,
    };

    await DataStore.getDB().getRepository(Config).save(tokenConf);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

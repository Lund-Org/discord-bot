const { readFileSync } = require('fs');
const { join } = require('path');
const { DataSource } = require('typeorm');
const { Config } = require('../dist/database/entities/Config');

const ormConfig = readFileSync(join(__dirname, '../ormconfig.json')).toString();
const db = new DataSource(JSON.parse(ormConfig));

(async () => {
  await db.initialize()
  const twitchToken = await db.getRepository(Config).findOne({ where: { name: 'TWITCH_TOKENS' } });

  if (twitchToken) {
    await db.getRepository(Config).remove(twitchToken);
  }

  console.log('Token removed');
})();

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { birthdayCmd } from './birthday';
import { gachaCmd } from './gacha';
import { googleCmd } from './google';
import { howlongtobeatCmd } from './howlongtobeat';
import { joinCmd } from './join';
import { pingCmd } from './ping';
import { pollCmd } from './poll';
import { pongCmd } from './pong';
import { ppCmd } from './pp';
import { shifumiCmd } from './shifumi';

const commands = [
  birthdayCmd,
  gachaCmd,
  googleCmd,
  howlongtobeatCmd,
  joinCmd,
  pingCmd,
  pollCmd,
  pongCmd,
  ppCmd,
  shifumiCmd,
];

export async function initCommands() {
  const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN || '');

  await rest
    .put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID || '',
        process.env.DISCORD_GUILD_ID || '',
      ),
      { body: commands },
    )
    .catch((e) => {
      console.log(e);
      throw e;
    });
  console.log('Successfully registered application commands.');
}

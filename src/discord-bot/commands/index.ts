import { gachaMenuResponse, gachaResponse } from './gacha';
import { googleResponse } from './google';
import { howlongtobeatResponse } from './howlongtobeat';
import { joinResponse } from './join';
import { pingResponse } from './ping';
import { pongResponse } from './pong';
import { pollResponse } from './poll';
import { ppResponse } from './pp';
import { shifumiResponse } from './shifumi';
import { birthdayResponse } from './birthday';

export const commandsResponses = [
  birthdayResponse,
  gachaResponse,
  googleResponse,
  howlongtobeatResponse,
  joinResponse,
  pingResponse,
  pongResponse,
  pollResponse,
  ppResponse,
  shifumiResponse,
];

export const menusCallback = [gachaMenuResponse];

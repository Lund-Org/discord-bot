import { postTwitchToken } from './handlers/twitch.token';

export const routes: mb.Route[] = [
  {
    methods: ['post'],
    url: '/twitch-token',
    handler: postTwitchToken,
  },
];

import { getUserRanks } from './handlers/users.ranks';
import { getUserProfile } from './handlers/users.profile';
import { getUserRank } from './handlers/users.rank';
import { getUserFusions } from './handlers/users.fusions';

export const routes: mb.Route[] = [
  {
    methods: ['get'],
    url: '/api/ranks',
    handler: getUserRanks,
  },
  {
    methods: ['get'],
    url: '/api/ranks/:id',
    handler: getUserRank,
  },
  {
    methods: ['get'],
    url: '/api/profile/:id',
    handler: getUserProfile,
  },
  {
    methods: ['get'],
    url: '/api/fusions/:discordId',
    handler: getUserFusions,
  },
];

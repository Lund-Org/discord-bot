import { getManyCards } from './handlers/cards.many';
import { getCardsToGold } from './handlers/cards.toGold';

export const routes: mb.Route[] = [
  {
    methods: ['get'],
    url: '/api/cards',
    handler: getManyCards,
  },
  {
    methods: ['get'],
    url: '/api/cards/to-gold/:id',
    handler: getCardsToGold,
  },
];

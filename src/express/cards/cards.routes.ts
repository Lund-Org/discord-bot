import { getManyCards } from './handlers/cards.many'

export const routes: mb.Route[] = [
  {
    methods: ['get'],
    url: '/api/cards',
    handler: getManyCards
  }
]

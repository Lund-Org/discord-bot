import { getManyCards } from './handlers/cards.many'

export const routes: mb.Route[] = [
  {
    methods: ['get'],
    url: '/cards',
    handler: getManyCards
  }
]

import { getUserRanks } from './handlers/users.ranks'

export const routes: mb.Route[] = [
  {
    methods: ['get'],
    url: '/ranks',
    handler: getUserRanks
  }
]

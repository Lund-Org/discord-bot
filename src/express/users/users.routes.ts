import { getUserRanks } from './handlers/users.ranks'

export const routes: mb.Route[] = [
  {
    methods: ['get'],
    url: '/api/ranks',
    handler: getUserRanks
  }
]

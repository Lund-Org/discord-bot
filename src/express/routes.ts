import { Application, Request, Response } from 'express'
import { routes as CardsRoutes } from './cards/cards.routes'
import { routes as UsersRoutes } from './users/users.routes'
import { routes as TwitchRoutes } from './twitch/twitch.routes'

async function renderWebApp(req: Request, res: Response) {
  res.sendFile('./public/index.html', { root: __dirname });
}

const FrontAppRoutes: mb.Route[] = [
  {
    methods: ['get'],
    url: '/',
    handler: renderWebApp
  },
  {
    methods: ['get'],
    url: '/ranks',
    handler: renderWebApp
  }
]

export default (app: Application) => {
  [...FrontAppRoutes, ...CardsRoutes, ...UsersRoutes, ...TwitchRoutes].forEach((route: mb.Route) => {
    route.methods.forEach((method: mb.HttpMethod) => {
      app[method](route.url, route.handler);
    })
  })
}

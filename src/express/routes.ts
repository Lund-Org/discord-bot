import { Application, Request, Response } from 'express'
import { resolve, join } from 'path'
import { routes as CardsRoutes } from './cards/cards.routes'
import { routes as UsersRoutes } from './users/users.routes'
import { routes as TwitchRoutes } from './twitch/twitch.routes'

async function renderWebApp(req: Request, res: Response) {
  res.sendFile(
    resolve(
      join(__dirname, '..', '..', 'public/index.html')
    )
  )
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
  },
  {
    methods: ['get'],
    url: '/profile/:id',
    handler: renderWebApp
  }
]

export default (app: Application) => {
  [...FrontAppRoutes, ...CardsRoutes, ...UsersRoutes, ...TwitchRoutes].forEach((route: mb.Route) => {
    route.methods.forEach((method: mb.HttpMethod) => {
      app[method](route.url, route.handler)
    })
  })
}

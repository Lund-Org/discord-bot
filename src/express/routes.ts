import { Application } from 'express';
import { routes as CardsRoutes } from './cards/cards.routes'
import { routes as UsersRoutes } from './users/users.routes'
import { routes as TwitchRoutes } from './twitch/twitch.routes'

export default (app: Application) => {
  [...CardsRoutes, ...UsersRoutes, ...TwitchRoutes].forEach((route: mb.Route) => {
    route.methods.forEach((method: mb.HttpMethod) => {
      app[method](route.url, route.handler);
    })
  })
}

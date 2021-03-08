import { Application } from 'express';
import { routes } from './cards/cards.routes'

export default (app: Application) => {
  routes.forEach((route: mb.Route) => {
    route.methods.forEach((method: mb.HttpMethod) => {
      app[method](route.url, route.handler);
    })
  })
}

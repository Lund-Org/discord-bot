import "reflect-metadata"
import { createConnection, getConnectionOptions, getRepository } from 'typeorm'
import { Config } from '../src/database/entities/Config'

getConnectionOptions().then((config) => {
  return createConnection(config)
}).then(() => {
  return getRepository(Config).findOne({ name: 'TWITCH_TOKENS' })
}).then((twitchToken) => {
  if (twitchToken) {
    return getRepository(Config).remove(twitchToken)
  }
  return Promise.resolve(null)
}).then(() => console.log('Token removed'))

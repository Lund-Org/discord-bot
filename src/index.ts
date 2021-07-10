import "reflect-metadata"
import { initDiscord } from './discord-bot'
import { initServer } from './express/server'
import { initTwitchPubSub } from './twitch-pubsub'
import { createConnection, getConnectionOptions } from 'typeorm';
import { initCron } from "./cron";
require('dotenv').config()


getConnectionOptions().then((config) => {
  return createConnection(config)
}).then(() => {
  console.log('Database connected')
  return Promise.all([
    initDiscord(),
    // initServer(),
    // initTwitchPubSub(),
  ])
}).then(([discordClient]) => {
  initCron(discordClient)
  console.log('=> Ready !');
})

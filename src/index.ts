import "reflect-metadata"
import { initDiscord } from './discord-bot'
import { initServer } from './express/server'
import { initTwitchPubSub } from './twitch-pubsub'
import { createConnection, getConnectionOptions } from 'typeorm';
import { initCron } from "./cron";
import { Client } from "discord.js";
require('dotenv').config()

getConnectionOptions().then((config) => {
  return createConnection(config)
}).then(() => {
  const bootstrapPromises = []

  if (process.argv.includes('--custom')) {
    bootstrapPromises.push(Promise.resolve(true))
    if (process.argv.includes('--bot')) {
      bootstrapPromises.push(initDiscord())
    }
    if (process.argv.includes('--web')) {
      bootstrapPromises.push(initServer())
    }
    if (process.argv.includes('--twitch')) {
      bootstrapPromises.push(initTwitchPubSub())
    }
  } else {
    bootstrapPromises.push(Promise.resolve(false))
    bootstrapPromises.push(initDiscord())
    bootstrapPromises.push(initServer())
    bootstrapPromises.push(initTwitchPubSub())
  }
  console.log('Database connected')
  return Promise.all(bootstrapPromises)
}).then(([isCustom, discordClient]) => {

  if ((isCustom && process.argv.includes('--bot')) || !isCustom) {
    initCron(discordClient as Client)
  }
  console.log('=> Ready !');
})

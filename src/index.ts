import "reflect-metadata"
import { initDiscord } from './discord-bot'
import { initServer } from './express/server'
import { createConnection, getConnectionOptions } from 'typeorm';
require('dotenv').config()

Promise.all([
  // initDatabase
  getConnectionOptions().then((config) => {
    return createConnection(config)
  }),
  initDiscord(),
  initServer(),
]).then(() => {
  console.log('=> Ready !');
})

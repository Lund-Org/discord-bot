import { Client, Message } from 'discord.js'
import { createConnection } from "typeorm"
import handlerClasses from './handlers'
import initializers from './initializers'
import Handler from './handlers/Handler'
import entities from './database/entities'
require('dotenv').config()

const client = new Client()
const handlers = handlerClasses.map((HandlerClass): Handler => {
  return new HandlerClass()
})

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag} !`)
  initializers.forEach(async (initializer: Function) => await initializer(client))
})

client.on('message', async (msg: Message) => {
  for (const handler of handlers) {
    if (handler.validate(client, msg)) {
      try {
        const result = await handler.process(client, msg)
        if (result) {
          break
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
})

client.on('error', () => {
  client.login(process.env.BOT_TOKEN)
});

(async () => {
  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: entities
  })

  client.login(process.env.BOT_TOKEN)
})()

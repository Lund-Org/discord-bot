import { Client, Message } from 'discord.js'
import handlerClasses from './handlers'
import initializers from './initializers'
import Handler from './handlers/Handler'
require('dotenv').config()

const client = new Client()
const handlers = handlerClasses.map((HandlerClass): Handler => {
  return new HandlerClass()
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag} !`)
  initializers.forEach((initializer: Function) => initializer(client))
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

client.login(process.env.BOT_TOKEN)

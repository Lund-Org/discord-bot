import { Client, Message } from 'discord.js'
import Handler from './Handler'

class PongHandler extends Handler {
  async process(client: Client, msg: Message): Promise<boolean> {
    if (msg.content.toLowerCase() === 'ping') {
      msg.channel.send('pong 🏓')
      return true
    }
    return false
  }
}

export default PongHandler

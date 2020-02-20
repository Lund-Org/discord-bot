import { Client, Message, Channel, TextChannel } from 'discord.js'
import Handler from './Handler'

class PongHandler extends Handler {
  async process(client: Client, msg: Message): Promise<boolean> {
    if (msg.content.toLowerCase() === 'ping') {
      this.processFault(msg.channel, 'pong 🏓')
      return true
    } else if (msg.content.toLowerCase() === 'pong') {
      this.processFault(msg.channel, 'ping 🏓')
      return true
    }
    return false
  }

  processFault (channel: Channel, response: string) {
    if (!(channel instanceof TextChannel)) {
      return
    }

    const botMissChances = Math.round(Math.random() * 100)
    const missChances = Math.round(Math.random() * 100)

    if (!missChances) {
      channel.send('Toc toc toc toc.... FAUTE ! 😡')
    } else if (!botMissChances) {
      channel.send('P.... dans le filet... Tu as... gagné 😲')
    } else {
      channel.send(response)
    }
  }
}

export default PongHandler

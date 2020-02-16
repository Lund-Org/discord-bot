import { Client, Message } from 'discord.js'
import Handler from './Handler'
import parsingHelper from '../helpers/parsingHelper'

class GoogleHandler extends Handler {
  validate (client: Client, msg: Message): boolean {
    return super.validate(client, msg) && msg.content.startsWith('!google')
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const query = parsingHelper.parseGoogleMessage(msg.content)

    msg.channel.send(`🤖 Voilà les résultats : https://www.google.com/search?q=${query}&oq=${query}`)
    return true
  }
}

export default GoogleHandler

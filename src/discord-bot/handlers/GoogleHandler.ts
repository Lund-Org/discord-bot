import { Client, Message } from 'discord.js'
import Handler from './Handler'
import parsingHelper from '../helpers/parsingHelper'
import DataStore from '../helpers/dataStore'

class GoogleHandler extends Handler {
  validate (client: Client, msg: Message): Promise<boolean> {
    return Promise.resolve(
      super.validate(client, msg) &&
      msg.content.startsWith(`${DataStore.getData('prefix')}google`)
    )
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const query = parsingHelper.parseGoogleMessage(msg.content)

    msg.channel.send(`🤖 Voilà les résultats : https://www.google.com/search?q=${query}&oq=${query}`)
    return true
  }
}

export default GoogleHandler

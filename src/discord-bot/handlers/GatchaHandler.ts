import { Client, Message } from 'discord.js'
import Handler from './Handler'
import parsingHelper from '../helpers/parsingHelper'
import DataStore from '../helpers/dataStore'
import { gatcha, addPoints } from './gatcha'

class GatchaHandler extends Handler {
  async validate (client: Client, msg: Message): Promise<boolean> {
    await addPoints({ msg });
    return super.validate(client, msg) && msg.content.startsWith(`${DataStore.getData('prefix')}gatcha`)
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const query = parsingHelper.parseGatchaCmd(msg.content)

    gatcha(client, msg, query);
    return true
  }
}

export default GatchaHandler

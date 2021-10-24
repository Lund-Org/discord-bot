import { Client, Message } from 'discord.js'
import Handler from './Handler'
import parsingHelper from '../helpers/parsingHelper'
import DataStore from '../helpers/dataStore'
import { gacha, addPoints } from './gacha'

class GachaHandler extends Handler {
  async validate (client: Client, msg: Message): Promise<boolean> {
    await addPoints({ msg })
    return super.validate(client, msg) && msg.content.startsWith(`${DataStore.getData('prefix')}gacha`)
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const query = parsingHelper.parseGachaCmd(msg.content)

    gacha(client, msg, query)
    return true
  }
}

export default GachaHandler

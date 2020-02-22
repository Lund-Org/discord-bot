import { Client, Message } from 'discord.js'
import Handler from './Handler'
import DataStore from '../helpers/dataStore'

class JoinAtHandler extends Handler {
  validate (client: Client, msg: Message): boolean {
    return super.validate(client, msg) && msg.content.startsWith(`${DataStore.getData('prefix')}join`)
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const date: Date = msg.member.joinedAt
    const dateStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().padStart(2, '0')}`
    const timeStr = `${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`

    msg.channel.send(`⌚ Tu as rejoint le serveur le ${dateStr} à ${timeStr}`)
    return true
  }
}

export default JoinAtHandler

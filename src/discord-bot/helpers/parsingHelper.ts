import { User, Message } from "discord.js"
import ShifumiEnum from '../enums/ShifumiEnum'
import DataStore from '../helpers/dataStore'

export default {
  /**
   * Parse the poll command
   * @param message The content of the message
   */
  parsePollMessage (message: string): Array<string> | null {
    const matches = message.match(/\[([^\[\]]+)\]/g)
    
    if (!matches || matches.length < 3) {
      return null
    } else {
      return matches
    }
  },
  /**
   * Parse the google command
   * @param message The content of the message
   */
  parseGoogleMessage (message: string): string {
    const match = message.match(new RegExp(`${DataStore.getData('prefix')}google (.*)`))

    if (match) {
      return encodeURI(match[1])
    } else {
      return ''
    }
  },
  /**
   * Parse the pp command
   * @param message The content of the message
   */
  async parseProfilePictureMessage(message: Message): Promise<User|null> {
    const match = message.content.match(new RegExp(`${DataStore.getData('prefix')}pp (.*)`))

    if (match) {
      const member = (await message.guild.members.fetch({
        query: match[1].toLowerCase(),
        limit: 1
      })).first()

      if (member) {
        return member.user
      }
    }
    return null
  },
  /**
   * Parse the pp command
   * @param msg The content of the message
   * @param availableValues The valid values for the command
   */
  parseShifumiMessage(msg: string, availableValues: ShifumiEnum[]): ShifumiEnum | null {
    const match = msg.match(new RegExp(`${DataStore.getData('prefix')}shifumi (.*)`))

    if (match && availableValues.reduce((accumulator, value) => accumulator || value === match[1], false)) {
      return availableValues.find(x => x === match[1])
    }
    return null
  },
  /**
   * Parse the gacha command
   * @param msg The content of the message
   */
  parseGachaCmd(msg: string): string | null {
    const match = msg.match(new RegExp(`${DataStore.getData('prefix')}gacha (.*)`))

    if (match) {
      return match[1].trim();
    }
    return null
  }
}

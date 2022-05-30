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
   * Parse the birthday command
   * @param message The content of the message
   */
  parseBirthdayMessage(message: string): number[] | null {
    const match = message.match(new RegExp(`${DataStore.getData('prefix')}birthday (\\d{1,2})\/(\\d{1,2})\/(\\d{4})`))

    if (match && match.length === 4) {
      const day = parseInt(match[1], 10)
      const month = parseInt(match[2], 10)
      const year = parseInt(match[3], 10)
      const currentDate = new Date()

      if (day >= 1 && day <= 31 && month >= 1 && month <= 12 &&
        year > currentDate.getFullYear() - 100 && year < currentDate.getFullYear()
      ) {
        return [day, month, year]
      }
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
      return match[1].trim()
    }
    return null
  }
}

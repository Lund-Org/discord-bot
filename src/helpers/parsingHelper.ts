import { User, Message, GuildMember, Collection } from "discord.js"
import ProfilePictureInterface from '../interfaces/ProfilePictureInterface'
import ShifumiEnum from '../enums/ShifumiEnum'

export default {
  /**
   * Parse the poll command
   * @param message The content of the message
   */
  parsePollMessage (message: string): Array<string> | null {
    const matches = message.match(/\[([A-Za-zÀ-ÿ0-9\s\?_\-'"\.]+)\]/g)
    
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
    const match = message.match(/!google (.*)/)

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
  parseProfilePictureMessage(message: Message): ProfilePictureInterface | null {
    const match = message.content.match(/!pp (.*)/)

    if (match) {
      const member: GuildMember = message.guild.members.find((member: GuildMember): boolean => {
        return member.user.username.toLowerCase() === match[1].toLowerCase()
      })
      const nearestNameMembers: Collection<string, GuildMember> = message.guild.members.filter((member: GuildMember): boolean => {
        return member.user.username.toLowerCase().includes(match[1].toLowerCase())
      })

      if (member || nearestNameMembers) {
        return {
          user: member ? member.user : null,
          nearestUsers: nearestNameMembers.map((x: GuildMember): User => x.user)
        }
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
    const match = msg.match(/!shifumi (.*)/)

    if (match && availableValues.reduce((accumulator, value) => accumulator || value === match[1], false)) {
      return availableValues.find(x => x === match[1])
    }
    return null
  }
}

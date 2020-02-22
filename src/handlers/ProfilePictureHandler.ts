import { Client, Message, User } from 'discord.js'
import Handler from './Handler'
import parsingHelper from '../helpers/parsingHelper'
import Singleton from '../helpers/singleton'

class ProfilePictureHandler extends Handler {
  validate (client: Client, msg: Message): boolean {
    return super.validate(client, msg) && msg.content.startsWith(`${Singleton.getData('prefix')}pp`)
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const { user, nearestUsers } = parsingHelper.parseProfilePictureMessage(msg)

    if (user && user.avatarURL) {
      msg.channel.send(user.avatarURL)
    } else if (user) {
      msg.channel.send('Cet utilisateur n\'a pas d\'avatar ☹')
    } else {
      const nearestNameUsersStr = nearestUsers.map((nearestUser: User): string => nearestUser.username).join(', ')
      msg.channel.send(`Utilisateur non trouvé 🧐 ${nearestUsers.length ? `Veux tu parler de l'une de ces personnes : ${nearestNameUsersStr} ?` : ''}`)
    }
    return true
  }
}

export default ProfilePictureHandler

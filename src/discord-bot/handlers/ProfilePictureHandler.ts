import { Client, Message } from 'discord.js'
import Handler from './Handler'
import parsingHelper from '../helpers/parsingHelper'
import DataStore from '../helpers/dataStore'

class ProfilePictureHandler extends Handler {
  validate (client: Client, msg: Message): Promise<boolean> {
    return Promise.resolve(
      super.validate(client, msg) &&
      msg.content.startsWith(`${DataStore.getData('prefix')}pp`)
    )
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const user = await parsingHelper.parseProfilePictureMessage(msg)

    if (user && user.avatarURL) {
      msg.channel.send(user.displayAvatarURL({ size: 256 }))
    } else if (user) {
      msg.channel.send('Cet utilisateur n\'a pas d\'avatar ☹')
    } else {
      msg.channel.send('Utilisateur non trouvé 🧐')
    }
    return true
  }
}

export default ProfilePictureHandler

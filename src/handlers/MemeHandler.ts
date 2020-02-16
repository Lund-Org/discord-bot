import { Client, Message } from 'discord.js'
import messageHelper from '../helpers/messageHelper'
import Handler from './Handler'

class MemeCheckerHandler extends Handler {
  validate(client: Client, msg: Message): boolean {
    return super.validate(client, msg) && messageHelper.isMemeChannel(msg)
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    if (!messageHelper.isUrl(msg) && !messageHelper.isValidImageFormat(msg.content) && msg.attachments.size === 0) {
      msg.delete()
    }
    return true
  }
}

export default MemeCheckerHandler

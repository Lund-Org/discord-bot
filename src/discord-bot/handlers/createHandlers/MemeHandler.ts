import { Client, Message } from 'discord.js';
import { Handler } from '../Handler';
import messageHelper from '../../helpers/messageHelper';

class MemeCheckerHandler extends Handler {
  authorizedWebsites: string[];

  constructor() {
    super();
    this.authorizedWebsites = [
      'tenor.com',
      'imgur.com',
      'giphy.com',
      'twitter.com',
    ];
  }

  async validate(client: Client, msg: Message): Promise<boolean> {
    const isValid =
      (await super.validate(client, msg)) && messageHelper.isMemeChannel(msg);

    return isValid;
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    let keepMsg = false;

    keepMsg = keepMsg || (msg.attachments.size > 0 && msg.content === '');
    keepMsg =
      keepMsg ||
      (messageHelper.isUrl(msg) &&
        messageHelper.isValidImageFormat(msg.content));
    keepMsg =
      keepMsg ||
      (messageHelper.isUrl(msg) &&
        messageHelper.isWhitelistedHostname(
          msg.content,
          this.authorizedWebsites,
        ));

    if (!keepMsg) {
      msg.delete();
    }
    return true;
  }
}

export default MemeCheckerHandler;

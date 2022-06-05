import { Client, Message } from 'discord.js';
import messageHelper from '../helpers/messageHelper.js';

export abstract class Handler {
  validate(client: Client, msg: Message): Promise<boolean> {
    return messageHelper.ignoreSelfMessage(client, msg);
  }
  abstract process(client: Client, msg: Message): Promise<boolean>;
}

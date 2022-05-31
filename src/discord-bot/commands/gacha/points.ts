import { Message } from 'discord.js';
import { userNotFound } from './helper';

export const points = async ({ msg }: { msg: Message }) => {
  const player = await userNotFound({ msg });

  if (!player) {
    return;
  }

  msg.channel.send(`Tu possèdes actuellement ${player.points} points`);
};

import { Client, Message } from 'discord.js';
import { Handler } from '../Handler';
import { Player } from '../../../database/entities/Player';
import DataStore from '../../../common/dataStore';

class GachaHandler extends Handler {
  async validate(client: Client, msg: Message): Promise<boolean> {
    return super.validate(client, msg);
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    await addPoints({ msg });
    return true;
  }
}

export const addPoints = async ({ msg }: { msg: Message }): Promise<void> => {
  const player = await DataStore.getDB()
    .getRepository(Player)
    .findOne({
      where: { discord_id: msg.author.id },
    });

  if (!player) {
    msg.reply(
      `Avant de pouvoir jouer, crée un compte avec la commande "/gacha join"`,
    );
    return;
  }

  const delay = 60 * 1000; // one minute

  // if last message is in less than 1 minute
  // AND less than 15 000 points
  if (
    player &&
    Date.now() - new Date(player.lastMessageDate).getTime() > delay &&
    player.points < 15000
  ) {
    player.points += 50;
    player.lastMessageDate = new Date();
    await DataStore.getDB().manager.save(player);
  }
};

export default GachaHandler;

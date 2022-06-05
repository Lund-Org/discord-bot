import { Client, Guild, Collection, GuildBasedChannel } from 'discord.js';
import { ChannelTypes } from 'discord.js/typings/enums';
import DataStore from '../../common/dataStore';

export default function (client: Client) {
  const servers: Collection<string, Guild> = client.guilds.cache;

  servers.every((server: Guild): boolean => {
    const hasMemeChannel = !!server.channels.cache.find(
      (channel: GuildBasedChannel) => {
        return channel.id === process.env.MEME_CHANNEL_ID;
      },
    );

    if (!hasMemeChannel && process.env.MEME_CHANNEL_NAME) {
      server.channels
        .create(process.env.MEME_CHANNEL_NAME, {
          type: ChannelTypes.GUILD_TEXT,
        })
        .then((newChannel) => {
          DataStore.setData('MEME_CHANNEL_ID', newChannel.id);
        });
    } else if (!hasMemeChannel) {
      console.log('Memes variables not set in the .env');
    } else {
      DataStore.setData('MEME_CHANNEL_ID', process.env.MEME_CHANNEL_ID || '');
    }
    return true;
  });
}

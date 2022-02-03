import { Client, Guild, Collection, GuildBasedChannel } from 'discord.js'
import { ChannelTypes } from 'discord.js/typings/enums'

export default function (client: Client) {
  const servers: Collection<string, Guild> = client.guilds.cache

  servers.every((server: Guild): boolean => {
    const hasMemeChannel = !!server.channels.cache.find((channel: GuildBasedChannel) => {
      return channel.id === process.env.MEME_CHANNEL_ID
    })

    if (!hasMemeChannel) {
      server.channels.create(process.env.MEME_CHANNEL_NAME, { type: ChannelTypes.GUILD_TEXT })
    }
    return true
  })
}

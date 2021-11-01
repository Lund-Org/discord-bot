import { Client, Guild, Collection, GuildChannel } from 'discord.js'

export default function (client: Client) {
  const servers: Collection<string, Guild> = client.guilds.cache

  servers.every((server: Guild): boolean => {
    const hasMemeChannel = !!server.channels.cache.find((channel: GuildChannel) => {
      return channel.id === process.env.MEME_CHANNEL_ID
    })

    if (!hasMemeChannel) {
      server.channels.create(process.env.MEME_CHANNEL_NAME, { type: 'text' })
    }
    return true
  })
}

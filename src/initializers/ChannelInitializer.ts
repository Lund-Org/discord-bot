import { Client, Guild, Collection, GuildChannel } from 'discord.js'

export default async function (client: Client) {
  const servers: Collection<string, Guild> = client.guilds;

  servers.every((server: Guild): boolean => {
    const hasMemeChannel = !!server.channels.find((channel: GuildChannel) => {
      return channel.name.includes(process.env.MEME_CHANNEL)
    })

    if (!hasMemeChannel) {
      server.createChannel(process.env.MEME_CHANNEL, { type: 'text' })
    }
    return true
  })
}

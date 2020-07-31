import { Client, Guild, Collection, Role as DiscordRole } from 'discord.js'
import { Role } from '../database/entities/Role'
import { RoleRepository } from '../database/repositories/RoleRepository'

export default async function (client: Client) {
  const servers: Collection<string, Guild> = client.guilds;
  const roleRepository = new RoleRepository()

  for (const server of servers.array()) {
    const roles: Role[] = await roleRepository.findAll()
    const registeredIds = roles.map((r) => r.discordId)

    server.roles.forEach(async (role: DiscordRole) => {
      if (role.name !== '@everyone') {
        if (!registeredIds.includes(role.id)) {
          await roleRepository.createRole(role.id, role.name)
        }
      }
    })
  }
}

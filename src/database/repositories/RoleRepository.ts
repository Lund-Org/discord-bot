import { getRepository, Repository } from 'typeorm'
import { Role } from '../entities/Role'

export class RoleRepository {
  roleRepository: Repository<Role> = null

  constructor () {
    this.roleRepository = getRepository(Role)
  }

  async findAll (): Promise<Role[]> {
    return this.roleRepository
      .createQueryBuilder('role')
      .getMany()
  }

  async createRole (discordId: string, name: string): Promise<Role> {
    const newRole = this.roleRepository.create({
      discordId,
      name,
      isActive: false
    })
    await this.roleRepository.save(newRole)
    
    return newRole
  }
}

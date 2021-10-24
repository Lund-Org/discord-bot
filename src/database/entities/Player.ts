import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad } from "typeorm"
import { PlayerInventory } from "./PlayerInventory"

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, type: 'text' })
  username: string

  @Column({ unique: true, nullable: false })
  discord_id: string

  @Column({ unique: true, nullable: true, default: null })
  twitch_username: string

  @Column()
  points: number

  @Column({ default: () => 'NOW()', nullable: false })
  lastMessageDate: Date

  @Column({ default: null, nullable: true })
  lastDailyDraw: Date|null

  @Column({ default: () => 'NOW()', nullable: false })
  joinDate: Date

  @OneToMany(() => PlayerInventory, inventory => inventory.player)
  inventories: PlayerInventory[]

  @AfterLoad()
  sortAttributes() {
    if (this?.inventories?.length) {
      this.inventories.sort((a, b) => (a.cardType?.id < b.cardType?.id ? -1 : a.cardType?.id === b.cardType?.id ? 0 : 1))
    }
  }
}

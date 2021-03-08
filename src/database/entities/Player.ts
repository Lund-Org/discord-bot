import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PlayerInventory } from "./PlayerInventory";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  discord_id: string;

  @Column()
  points: number;

  @Column({ default: () => 'NOW()', nullable: false })
  lastMessageDate: Date;

  @Column({ default: null, nullable: true })
  lastDailyDraw: Date|null;

  @Column({ default: () => 'NOW()', nullable: false })
  joinDate: Date;

  @OneToMany(() => PlayerInventory, inventory => inventory.player)
  inventories: PlayerInventory[];
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, unique: true, nullable: true })
  discordId: string;

  @Column({ default: null, nullable: true })
  emoji: string;

  @Column()
  name: string;

  @Column({ default: false })
  isActive: boolean;
}

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'json' })
  value: Record<string, unknown>
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pagination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  page: number;

  @Column({ unique: true, nullable: false })
  discordMessage_id: string;

  @Column({ nullable: false })
  discordUser_id: string;
}

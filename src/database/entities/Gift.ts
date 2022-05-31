import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Player } from './Player';

@Entity()
export class Gift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: false })
  beginning_datetime: Date;

  @Column({ type: 'datetime', nullable: false })
  end_datetime: Date;

  @Column({ unique: true, nullable: false })
  code: string;

  @Column({ type: 'json', nullable: false })
  bonus: Record<string, number>[];

  @ManyToMany(() => Player, (player) => player.gifts)
  @JoinTable({
    name: 'gifts_players',
    joinColumn: {
      name: 'gift',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'player',
      referencedColumnName: 'id',
    },
  })
  players: Player[];
}

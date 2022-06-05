import DataStore from '../../common/dataStore';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  AfterLoad,
  ManyToMany,
} from 'typeorm';
import { Gift } from './Gift';
import { PlayerInventory } from './PlayerInventory';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  username: string;

  @Column({ unique: true, nullable: false })
  discord_id: string;

  @Column({ unique: true, nullable: true, default: null })
  twitch_username: string;

  @Column()
  points: number;

  @Column({ type: 'date', default: () => 'NOW()', nullable: false })
  lastMessageDate: Date;

  @Column({ type: 'date', default: null, nullable: true })
  lastDailyDraw: Date | null;

  @Column({ type: 'date', default: () => 'NOW()', nullable: false })
  joinDate: Date;

  @OneToMany(
    () => PlayerInventory,
    (inventory: PlayerInventory) => inventory.player,
  )
  inventories: PlayerInventory[];

  @ManyToMany(() => Gift, (gift: Gift) => gift.players)
  gifts: Gift[];

  @AfterLoad()
  sortAttributes() {
    if (this?.inventories?.length) {
      this.inventories.sort((a, b) =>
        a.cardType?.id < b.cardType?.id
          ? -1
          : a.cardType?.id === b.cardType?.id
          ? 0
          : 1,
      );
    }
  }

  async saveNewGift(gift: Gift) {
    await DataStore.getDB().manager.query(
      'INSERT INTO gifts_players(`gift`, `player`) VALUES(?, ?)',
      [gift.id, this.id],
    );
  }

  async addPoints(points: number) {
    if (points === 0) {
      return;
    }

    await DataStore.getDB().manager.query(
      `UPDATE player
        SET points = points + ?
        WHERE id = ?`,
      [points, this.id],
    );
  }
}

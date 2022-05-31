import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardType } from './CardType';
import { Player } from './Player';

@Entity()
export class PlayerInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  type: string;

  @ManyToOne(() => Player, (player) => player.inventories)
  player: Player;

  @ManyToOne(() => CardType, (cardType) => cardType.playerInventories)
  cardType: CardType;
}

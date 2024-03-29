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

  @ManyToOne(() => Player, (player: Player) => player.inventories)
  player: Player;

  @ManyToOne(() => CardType, (cardType: CardType) => cardType.playerInventories)
  cardType: CardType;
}

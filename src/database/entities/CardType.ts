import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { PlayerInventory } from "./PlayerInventory";

@Entity()
export class CardType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  level: number;

  @Column({ unique: true, nullable: false })
  imageName: string;

  @Column({ default: false })
  isFusion: boolean;

  @OneToMany(() => PlayerInventory, inventory => inventory.cardType)
  playerInventories: PlayerInventory[];

  @ManyToMany(() => CardType, cardType => cardType.possibleFusions)
  @JoinTable({
    name: "fusion_dependencies",
    joinColumn: {
      name: "fusion",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "dependency",
      referencedColumnName: "id"
    }
  })
  fusionDependencies: CardType[];

  @ManyToMany(() => CardType, cardType => cardType.fusionDependencies)
  possibleFusions: CardType[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad } from "typeorm";

@Entity()
export class Birthday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  discord_id: string;

  @Column({ nullable: false })
  birthday_day: number;

  @Column({ nullable: false })
  birthday_month: number;

  @Column({ nullable: false })
  birthday_year: number;
}

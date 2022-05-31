import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLinkBetweenPlayerAndGifts1637258996842
  implements MigrationInterface
{
  name = 'AddLinkBetweenPlayerAndGifts1637258996842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `gifts_players` (`gift` int NOT NULL, `player` int NOT NULL, INDEX `IDX_3913a9e50896ba99c5c98563ea` (`gift`), INDEX `IDX_57a62c15cb5f7c502526d5e395` (`player`), PRIMARY KEY (`gift`, `player`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `gifts_players` ADD CONSTRAINT `FK_3913a9e50896ba99c5c98563eac` FOREIGN KEY (`gift`) REFERENCES `gift`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `gifts_players` ADD CONSTRAINT `FK_57a62c15cb5f7c502526d5e3951` FOREIGN KEY (`player`) REFERENCES `player`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `gifts_players` DROP FOREIGN KEY `FK_57a62c15cb5f7c502526d5e3951`',
    );
    await queryRunner.query(
      'ALTER TABLE `gifts_players` DROP FOREIGN KEY `FK_3913a9e50896ba99c5c98563eac`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_57a62c15cb5f7c502526d5e395` ON `gifts_players`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_3913a9e50896ba99c5c98563ea` ON `gifts_players`',
    );
    await queryRunner.query('DROP TABLE `gifts_players`');
  }
}

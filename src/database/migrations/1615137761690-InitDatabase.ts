import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1615137761690 implements MigrationInterface {
  name = 'InitDatabase1615137761690';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `player` (`id` int NOT NULL AUTO_INCREMENT, `discord_id` varchar(255) NOT NULL, `points` int NOT NULL, `lastMessageDate` datetime NOT NULL DEFAULT NOW(), `lastDailyDraw` datetime NULL DEFAULT NULL, `joinDate` datetime NOT NULL DEFAULT NOW(), UNIQUE INDEX `IDX_5a2943d8bff8ef7ff1545ba1a2` (`discord_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `player_inventory` (`id` int NOT NULL AUTO_INCREMENT, `total` int NOT NULL, `playerId` int NULL, `cardTypeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `card_type` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `level` int NOT NULL, `imageName` varchar(255) NOT NULL, `isFusion` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_49bcd78532a5c7496bce867025` (`name`), UNIQUE INDEX `IDX_494da8fcfb880f2773a49fba11` (`imageName`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `pagination` (`id` int NOT NULL AUTO_INCREMENT, `page` int NOT NULL, `discordMessage_id` varchar(255) NOT NULL, UNIQUE INDEX `IDX_98641be45ea717f03ff76f3a41` (`discordMessage_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `fusion_dependencies` (`fusion` int NOT NULL, `dependency` int NOT NULL, INDEX `IDX_d8023b1f88863c4c5a310767e2` (`fusion`), INDEX `IDX_e893a058a33b09bea89854dbf7` (`dependency`), PRIMARY KEY (`fusion`, `dependency`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `player_inventory` ADD CONSTRAINT `FK_dd6faa12ffc2af29f512a50d2e3` FOREIGN KEY (`playerId`) REFERENCES `player`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `player_inventory` ADD CONSTRAINT `FK_2414fe8c850c463f77f80694ad9` FOREIGN KEY (`cardTypeId`) REFERENCES `card_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `fusion_dependencies` ADD CONSTRAINT `FK_d8023b1f88863c4c5a310767e2d` FOREIGN KEY (`fusion`) REFERENCES `card_type`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `fusion_dependencies` ADD CONSTRAINT `FK_e893a058a33b09bea89854dbf7d` FOREIGN KEY (`dependency`) REFERENCES `card_type`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `fusion_dependencies` DROP FOREIGN KEY `FK_e893a058a33b09bea89854dbf7d`',
    );
    await queryRunner.query(
      'ALTER TABLE `fusion_dependencies` DROP FOREIGN KEY `FK_d8023b1f88863c4c5a310767e2d`',
    );
    await queryRunner.query(
      'ALTER TABLE `player_inventory` DROP FOREIGN KEY `FK_2414fe8c850c463f77f80694ad9`',
    );
    await queryRunner.query(
      'ALTER TABLE `player_inventory` DROP FOREIGN KEY `FK_dd6faa12ffc2af29f512a50d2e3`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_e893a058a33b09bea89854dbf7` ON `fusion_dependencies`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_d8023b1f88863c4c5a310767e2` ON `fusion_dependencies`',
    );
    await queryRunner.query('DROP TABLE `fusion_dependencies`');
    await queryRunner.query(
      'DROP INDEX `IDX_98641be45ea717f03ff76f3a41` ON `pagination`',
    );
    await queryRunner.query('DROP TABLE `pagination`');
    await queryRunner.query(
      'DROP INDEX `IDX_494da8fcfb880f2773a49fba11` ON `card_type`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_49bcd78532a5c7496bce867025` ON `card_type`',
    );
    await queryRunner.query('DROP TABLE `card_type`');
    await queryRunner.query('DROP TABLE `player_inventory`');
    await queryRunner.query(
      'DROP INDEX `IDX_5a2943d8bff8ef7ff1545ba1a2` ON `player`',
    );
    await queryRunner.query('DROP TABLE `player`');
  }
}

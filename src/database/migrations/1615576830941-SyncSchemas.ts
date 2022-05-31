import { MigrationInterface, QueryRunner } from 'typeorm';

export class SyncSchemas1615576830941 implements MigrationInterface {
  name = 'SyncSchemas1615576830941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `player_inventory` ADD `type` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `pagination` ADD `discordUser_id` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `player` CHANGE `lastMessageDate` `lastMessageDate` datetime NOT NULL DEFAULT NOW()',
    );
    await queryRunner.query(
      'ALTER TABLE `player` CHANGE `lastDailyDraw` `lastDailyDraw` datetime NULL DEFAULT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `player` CHANGE `joinDate` `joinDate` datetime NOT NULL DEFAULT NOW()',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `player` CHANGE `joinDate` `joinDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE `player` CHANGE `lastDailyDraw` `lastDailyDraw` datetime NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `player` CHANGE `lastMessageDate` `lastMessageDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE `pagination` DROP COLUMN `discordUser_id`',
    );
    await queryRunner.query(
      'ALTER TABLE `player_inventory` DROP COLUMN `type`',
    );
  }
}

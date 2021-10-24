import {MigrationInterface, QueryRunner} from "typeorm"

export class UpdateDatabaseTables1625929118327 implements MigrationInterface {
    name = 'UpdateDatabaseTables1625929118327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `birthday` (`id` int NOT NULL AUTO_INCREMENT, `discord_id` varchar(255) NOT NULL, `birthday_day` int NOT NULL, `birthday_month` int NOT NULL, `birthday_year` int NOT NULL, UNIQUE INDEX `IDX_3b052876e3445fb67185f04c43` (`discord_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB")
        await queryRunner.query("ALTER TABLE `player` CHANGE `twitch_username` `twitch_username` varchar(255) NULL DEFAULT NULL")
        await queryRunner.query("ALTER TABLE `player` CHANGE `lastMessageDate` `lastMessageDate` datetime NOT NULL DEFAULT NOW()")
        await queryRunner.query("ALTER TABLE `player` CHANGE `lastDailyDraw` `lastDailyDraw` datetime NULL DEFAULT NULL")
        await queryRunner.query("ALTER TABLE `player` CHANGE `joinDate` `joinDate` datetime NOT NULL DEFAULT NOW()")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `player` CHANGE `joinDate` `joinDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP")
        await queryRunner.query("ALTER TABLE `player` CHANGE `lastDailyDraw` `lastDailyDraw` datetime NULL")
        await queryRunner.query("ALTER TABLE `player` CHANGE `lastMessageDate` `lastMessageDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP")
        await queryRunner.query("ALTER TABLE `player` CHANGE `twitch_username` `twitch_username` varchar(255) NULL")
        await queryRunner.query("DROP INDEX `IDX_3b052876e3445fb67185f04c43` ON `birthday`")
        await queryRunner.query("DROP TABLE `birthday`")
    }

}

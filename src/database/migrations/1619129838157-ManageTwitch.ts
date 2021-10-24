import {MigrationInterface, QueryRunner} from "typeorm"

export class ManageTwitch1619129838157 implements MigrationInterface {
    name = 'ManageTwitch1619129838157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `player` ADD `twitch_username` varchar(255) DEFAULT NULL")
        await queryRunner.query("ALTER TABLE `player` ADD UNIQUE INDEX `IDX_a63e33a2fe4a412440ccbf574e` (`twitch_username`)")
        await queryRunner.query(`INSERT INTO config (name, value) VALUES ('TWITCH_REWARD', "${JSON.stringify({
            rewardName: 'Points de gacha (Discord)',
            points: 2500
        }).replace(/"/g, '\\"')}");`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `player` DROP INDEX `IDX_a63e33a2fe4a412440ccbf574e`")
        await queryRunner.query("ALTER TABLE `player` DROP COLUMN `twitch_username`")
    }

}

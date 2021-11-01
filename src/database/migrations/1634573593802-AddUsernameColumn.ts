import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsernameColumn1634573593802 implements MigrationInterface {
    name = 'AddUsernameColumn1634573593802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `player` ADD `username` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `player` DROP COLUMN `username`");
    }

}

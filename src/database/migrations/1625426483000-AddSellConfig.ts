import {MigrationInterface, QueryRunner} from "typeorm"

export class AddSellConfig1625426483000 implements MigrationInterface {
    name = 'AddSellConfig1625426483000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO config (name, value) VALUES ('SELL', "${JSON.stringify({
            basic: 100,
            gold: 300
        }).replace(/"/g, '\\"')}");`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM `config` WHERE name = 'SELL'")
    }

}

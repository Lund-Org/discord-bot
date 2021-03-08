import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConfig1615142888142 implements MigrationInterface {
    name = 'addConfig1615142888142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const chances = { 1: 60, 2: 25, 3: 11, 4: 4 }
        const levels = {
            1: 0,
            2: 1500,
            3: 2500,
            4: 5000,
            5: 7500,
            6: 10000,
            7: 13300,
            8: 16600,
            9: 20000,
            10: 23300,
            11: 26600,
            12: 30000,
            13: 33300,
            14: 36600,
            15: 40000,
            16: 43300,
            17: 46600,
            18: 50000,
            19: 55000,
            20: 60000
        }

        await queryRunner.query("CREATE TABLE `config` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `value` json NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query(`INSERT INTO config (name, value) VALUES ('DROP_CHANCES', "${JSON.stringify(chances).replace(/"/g, '\\"')}");`);
        await queryRunner.query(`INSERT INTO config(name, value) VALUES("LEVELS", "${JSON.stringify(levels).replace(/"/g, '\\"')}");`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `config`");
    }
}

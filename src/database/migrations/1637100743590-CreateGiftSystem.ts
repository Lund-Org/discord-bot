import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateGiftSystem1637100743590 implements MigrationInterface {
    name = 'CreateGiftSystem1637100743590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `gift` (`id` int NOT NULL AUTO_INCREMENT, `beginning_datetime` datetime NOT NULL, `end_datetime` datetime NOT NULL, `code` varchar(255) NOT NULL, `bonus` json NOT NULL, UNIQUE INDEX `IDX_d7678c07920c2cc6804884d931` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB");

        const giftConfigs = [
            { beginning_datetime: new Date(2021, 11, 1, 0, 0, 0), end_datetime: new Date(2021, 11, 1, 23, 59, 59), code: 'NOEL01', bonus: [{ points: 250 }] },
            { beginning_datetime: new Date(2021, 11, 2, 0, 0, 0), end_datetime: new Date(2021, 11, 2, 23, 59, 59), code: 'NOEL02', bonus: [{ card: 1 }] },
            { beginning_datetime: new Date(2021, 11, 3, 0, 0, 0), end_datetime: new Date(2021, 11, 3, 23, 59, 59), code: 'NOEL03', bonus: [{ points: 500 }] },
            { beginning_datetime: new Date(2021, 11, 4, 0, 0, 0), end_datetime: new Date(2021, 11, 4, 23, 59, 59), code: 'NOEL04', bonus: [{ card: 1 }, { points: 500 }] },
            { beginning_datetime: new Date(2021, 11, 5, 0, 0, 0), end_datetime: new Date(2021, 11, 5, 23, 59, 59), code: 'NOEL05', bonus: [{ points: 1000 }] },
            { beginning_datetime: new Date(2021, 11, 6, 0, 0, 0), end_datetime: new Date(2021, 11, 6, 23, 59, 59), code: 'NOEL06', bonus: [{ card: 2 }] },
            { beginning_datetime: new Date(2021, 11, 7, 0, 0, 0), end_datetime: new Date(2021, 11, 7, 23, 59, 59), code: 'NOEL07', bonus: [{ card: 2 }, { points: 1000 }] },
            { beginning_datetime: new Date(2021, 11, 8, 0, 0, 0), end_datetime: new Date(2021, 11, 8, 23, 59, 59), code: 'NOEL08', bonus: [{ points: 1500 }] },
            { beginning_datetime: new Date(2021, 11, 9, 0, 0, 0), end_datetime: new Date(2021, 11, 9, 23, 59, 59), code: 'NOEL09', bonus: [{ card: 2 }] },
            { beginning_datetime: new Date(2021, 11, 10, 0, 0, 0), end_datetime: new Date(2021, 11, 10, 23, 59, 59), code: 'NOEL10', bonus: [{ gold: 1 }] },
            { beginning_datetime: new Date(2021, 11, 11, 0, 0, 0), end_datetime: new Date(2021, 11, 11, 23, 59, 59), code: 'NOEL11', bonus: [{ points: 1500 }] },
            { beginning_datetime: new Date(2021, 11, 12, 0, 0, 0), end_datetime: new Date(2021, 11, 12, 23, 59, 59), code: 'NOEL12', bonus: [{ card: 1 }] },
            { beginning_datetime: new Date(2021, 11, 13, 0, 0, 0), end_datetime: new Date(2021, 11, 13, 23, 59, 59), code: 'NOEL13', bonus: [{ card: 1 }, { points: 1000 }] },
            { beginning_datetime: new Date(2021, 11, 14, 0, 0, 0), end_datetime: new Date(2021, 11, 14, 23, 59, 59), code: 'NOEL14', bonus: [{ card: 2 }] },
            { beginning_datetime: new Date(2021, 11, 15, 0, 0, 0), end_datetime: new Date(2021, 11, 15, 23, 59, 59), code: 'NOEL15', bonus: [{ points: 2000 }] },
            { beginning_datetime: new Date(2021, 11, 16, 0, 0, 0), end_datetime: new Date(2021, 11, 16, 23, 59, 59), code: 'NOEL16', bonus: [{ points: 2500 }] },
            { beginning_datetime: new Date(2021, 11, 17, 0, 0, 0), end_datetime: new Date(2021, 11, 17, 23, 59, 59), code: 'NOEL17', bonus: [{ card: 1 }, { points: 2000 }] },
            { beginning_datetime: new Date(2021, 11, 18, 0, 0, 0), end_datetime: new Date(2021, 11, 18, 23, 59, 59), code: 'NOEL18', bonus: [{ card: 2 }] },
            { beginning_datetime: new Date(2021, 11, 19, 0, 0, 0), end_datetime: new Date(2021, 11, 19, 23, 59, 59), code: 'NOEL19', bonus: [{ points: 2500 }] },
            { beginning_datetime: new Date(2021, 11, 20, 0, 0, 0), end_datetime: new Date(2021, 11, 20, 23, 59, 59), code: 'NOEL20', bonus: [{ gold: 2 }] },
            { beginning_datetime: new Date(2021, 11, 21, 0, 0, 0), end_datetime: new Date(2021, 11, 21, 23, 59, 59), code: 'NOEL21', bonus: [{ card: 1 }, { points: 1500 }] },
            { beginning_datetime: new Date(2021, 11, 22, 0, 0, 0), end_datetime: new Date(2021, 11, 22, 23, 59, 59), code: 'NOEL22', bonus: [{ gold: 1 }, { points: 1500 }] },
            { beginning_datetime: new Date(2021, 11, 23, 0, 0, 0), end_datetime: new Date(2021, 11, 23, 23, 59, 59), code: 'NOEL23', bonus: [{ card: 3 }] },
            { beginning_datetime: new Date(2021, 11, 24, 0, 0, 0), end_datetime: new Date(2021, 11, 24, 23, 59, 59), code: 'NOEL24', bonus: [{ gold: 3 }, { points: 6000 }] },
        ]

        await Promise.all(
            giftConfigs.map(async (giftConfig) => queryRunner.query(
                `INSERT INTO gift (beginning_datetime, end_datetime, code, bonus) VALUES ("${
                    giftConfig.beginning_datetime.toISOString().substring(0, 10)
                }", "${
                    giftConfig.end_datetime.toISOString().substring(0, 10)
                }", "${
                    giftConfig.code
                }", "${
                    JSON.stringify(giftConfig.bonus).replace(/"/g, '\\"')
                }");`
            ))
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_d7678c07920c2cc6804884d931` ON `gift`");
        await queryRunner.query("DROP TABLE `gift`");
    }

}

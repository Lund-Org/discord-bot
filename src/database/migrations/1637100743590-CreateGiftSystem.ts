import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGiftSystem1637100743590 implements MigrationInterface {
  name = 'CreateGiftSystem1637100743590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `gift` (`id` int NOT NULL AUTO_INCREMENT, `beginning_datetime` datetime NOT NULL, `end_datetime` datetime NOT NULL, `code` varchar(255) NOT NULL, `bonus` json NOT NULL, UNIQUE INDEX `IDX_d7678c07920c2cc6804884d931` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );

    const giftConfigs = [
      {
        beginning_datetime: '2021-12-01 00:00:00',
        end_datetime: '2021-12-01 23:59:59',
        code: 'NOEL01',
        bonus: [{ points: 250 }],
      },
      {
        beginning_datetime: '2021-12-02 00:00:00',
        end_datetime: '2021-12-02 23:59:59',
        code: 'NOEL02',
        bonus: [{ card: 1 }],
      },
      {
        beginning_datetime: '2021-12-03 00:00:00',
        end_datetime: '2021-12-03 23:59:59',
        code: 'NOEL03',
        bonus: [{ points: 500 }],
      },
      {
        beginning_datetime: '2021-12-04 00:00:00',
        end_datetime: '2021-12-04 23:59:59',
        code: 'NOEL04',
        bonus: [{ card: 1 }, { points: 500 }],
      },
      {
        beginning_datetime: '2021-12-05 00:00:00',
        end_datetime: '2021-12-05 23:59:59',
        code: 'NOEL05',
        bonus: [{ points: 1000 }],
      },
      {
        beginning_datetime: '2021-12-06 00:00:00',
        end_datetime: '2021-12-06 23:59:59',
        code: 'NOEL06',
        bonus: [{ card: 2 }],
      },
      {
        beginning_datetime: '2021-12-07 00:00:00',
        end_datetime: '2021-12-07 23:59:59',
        code: 'NOEL07',
        bonus: [{ card: 2 }, { points: 1000 }],
      },
      {
        beginning_datetime: '2021-12-08 00:00:00',
        end_datetime: '2021-12-08 23:59:59',
        code: 'NOEL08',
        bonus: [{ points: 1500 }],
      },
      {
        beginning_datetime: '2021-12-09 00:00:00',
        end_datetime: '2021-12-09 23:59:59',
        code: 'NOEL09',
        bonus: [{ card: 2 }],
      },
      {
        beginning_datetime: '2021-12-10 00:00:00',
        end_datetime: '2021-12-10 23:59:59',
        code: 'NOEL10',
        bonus: [{ gold: 1 }],
      },
      {
        beginning_datetime: '2021-12-11 00:00:00',
        end_datetime: '2021-12-11 23:59:59',
        code: 'NOEL11',
        bonus: [{ points: 1500 }],
      },
      {
        beginning_datetime: '2021-12-12 00:00:00',
        end_datetime: '2021-12-12 23:59:59',
        code: 'NOEL12',
        bonus: [{ card: 1 }],
      },
      {
        beginning_datetime: '2021-12-13 00:00:00',
        end_datetime: '2021-12-13 23:59:59',
        code: 'NOEL13',
        bonus: [{ card: 1 }, { points: 1000 }],
      },
      {
        beginning_datetime: '2021-12-14 00:00:00',
        end_datetime: '2021-12-14 23:59:59',
        code: 'NOEL14',
        bonus: [{ card: 2 }],
      },
      {
        beginning_datetime: '2021-12-15 00:00:00',
        end_datetime: '2021-12-15 23:59:59',
        code: 'NOEL15',
        bonus: [{ points: 2000 }],
      },
      {
        beginning_datetime: '2021-12-16 00:00:00',
        end_datetime: '2021-12-16 23:59:59',
        code: 'NOEL16',
        bonus: [{ points: 2500 }],
      },
      {
        beginning_datetime: '2021-12-17 00:00:00',
        end_datetime: '2021-12-17 23:59:59',
        code: 'NOEL17',
        bonus: [{ card: 1 }, { points: 2000 }],
      },
      {
        beginning_datetime: '2021-12-18 00:00:00',
        end_datetime: '2021-12-18 23:59:59',
        code: 'NOEL18',
        bonus: [{ card: 2 }],
      },
      {
        beginning_datetime: '2021-12-19 00:00:00',
        end_datetime: '2021-12-19 23:59:59',
        code: 'NOEL19',
        bonus: [{ points: 2500 }],
      },
      {
        beginning_datetime: '2021-12-20 00:00:00',
        end_datetime: '2021-12-20 23:59:59',
        code: 'NOEL20',
        bonus: [{ gold: 2 }],
      },
      {
        beginning_datetime: '2021-12-21 00:00:00',
        end_datetime: '2021-12-21 23:59:59',
        code: 'NOEL21',
        bonus: [{ card: 1 }, { points: 1500 }],
      },
      {
        beginning_datetime: '2021-12-22 00:00:00',
        end_datetime: '2021-12-22 23:59:59',
        code: 'NOEL22',
        bonus: [{ gold: 1 }, { points: 1500 }],
      },
      {
        beginning_datetime: '2021-12-23 00:00:00',
        end_datetime: '2021-12-23 23:59:59',
        code: 'NOEL23',
        bonus: [{ card: 3 }],
      },
      {
        beginning_datetime: '2021-12-24 00:00:00',
        end_datetime: '2021-12-24 23:59:59',
        code: 'NOEL24',
        bonus: [{ gold: 3 }, { points: 6000 }],
      },
    ];

    await Promise.all(
      giftConfigs.map(async (giftConfig) =>
        queryRunner.query(
          `INSERT INTO gift (beginning_datetime, end_datetime, code, bonus) VALUES ("${
            giftConfig.beginning_datetime
          }", "${giftConfig.end_datetime}", "${
            giftConfig.code
          }", "${JSON.stringify(giftConfig.bonus).replace(/"/g, '\\"')}");`,
        ),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_d7678c07920c2cc6804884d931` ON `gift`',
    );
    await queryRunner.query('DROP TABLE `gift`');
  }
}

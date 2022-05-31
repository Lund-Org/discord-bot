import { MigrationInterface, QueryRunner } from 'typeorm';

const oldChances = { 1: 60, 2: 25, 3: 11, 4: 4 };
const chances = { 1: 50, 2: 30, 3: 15, 4: 5 };
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
  20: 60000,
  21: 65000,
  22: 70000,
  23: 75000,
  24: 80000,
  25: 85000,
  26: 90000,
  27: 95000,
  28: 100000,
  29: 105000,
  30: 110000,
  31: 115000,
  32: 120000,
  33: 125000,
  34: 130000,
  35: 135000,
  36: 140000,
  37: 145000,
  38: 150000,
  39: 155000,
  40: 160000,
};

export class UpdateConfig1647112218998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE config SET value = "${JSON.stringify(chances).replace(
        /"/g,
        '\\"',
      )}" WHERE name = "DROP_CHANCES";`,
    );
    await queryRunner.query(
      `UPDATE config SET value = "${JSON.stringify(levels).replace(
        /"/g,
        '\\"',
      )}" WHERE name = "LEVELS";`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE config SET value = "${JSON.stringify(oldChances).replace(
        /"/g,
        '\\"',
      )}" WHERE name = "DROP_CHANCES";`,
    );
  }
}

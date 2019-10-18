import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAccountMonthTable1570626222513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'account_month',
            columns: [
                {
                    name: 'idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'club_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: '클럽IDX',
                }, {
                    name: 'yyyy',
                    type: 'char',
                    length: '4',
                    isPrimary: false,
                    isNullable: false,
                    comment: '년도',
                }, {
                    name: 'mm',
                    type: 'char',
                    length: '2',
                    isPrimary: false,
                    isNullable: false,
                    comment: '월',
                }, {
                    name: 'in_price',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
                    comment: '입금액',
                }, {
                    name: 'ex_price',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
                    comment: '출금액',
                }, {
                    name: 'sum_price',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
                    comment: '입출금액합',
                }, {
                    name: 'reg_dt',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: false,
                    comment: '등록일',
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'edt_dt',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: false,
                    comment: '수정일',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('account_month');
    }

}

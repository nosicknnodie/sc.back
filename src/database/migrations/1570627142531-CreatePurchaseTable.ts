import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePurchaseTable1570627142531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'purchase',
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
                    name: 'stuff_type',
                    type: 'char',
                    length: '4',
                    isPrimary: false,
                    isNullable: false,
                    comment: '물품타입',
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: false,
                    comment: '물품명',
                }, {
                    name: 'price',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
                    comment: '물품개당가격',
                }, {
                    name: 'amount',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
                    comment: '갯수',
                }, {
                    name: 'all_price',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
                    comment: '총가격',
                }, {
                    name: 'pur_dt',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: false,
                    comment: '구매일',
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
        await queryRunner.dropTable('purchase');
    }

}

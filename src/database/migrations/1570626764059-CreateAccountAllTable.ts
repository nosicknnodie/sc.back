import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAccountAllTable1570626764059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'account_all',
            columns: [
                {
                    name: 'club_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: '클럽IDX',
                }, {
                    name: 'price',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
                    comment: '년도',
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
        await queryRunner.dropTable('account_all');
    }

}

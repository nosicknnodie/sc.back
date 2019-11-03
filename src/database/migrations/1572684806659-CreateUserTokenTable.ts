import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTokenTable1572684806659 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'user_token',
            columns: [
                {
                    name: 'idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'user_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'host_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'token',
                    type: 'varchar',
                    length: '1000',
                    isPrimary: false,
                    isNullable: false,
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
        await queryRunner.dropTable('user_token');
    }

}

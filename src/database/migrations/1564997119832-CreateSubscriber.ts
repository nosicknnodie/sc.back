import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSubscriber1564997119832 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'subscribers_tb',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '45',
                    isPrimary: true,
                    isNullable: false,
                    comment: 'key',
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '45',
                    isPrimary: false,
                    isNullable: false,
                    comment: '이름',
                }, {
                    name: 'api_cd',
                    type: 'varchar',
                    length: '45',
                    isPrimary: false,
                    isNullable: false,
                    comment: 'api코드',
                }, {
                    name: 'api_id',
                    type: 'varchar',
                    length: '45',
                    isPrimary: false,
                    isNullable: false,
                    comment: 'api아이디',
                }, {
                    name: 'dt_of_birth',
                    type: 'date',
                    isPrimary: false,
                    isNullable: false,
                    comment: '생년월일',
                } , {
                    name: 'prefer_position',
                    type: 'varchar',
                    length: '45',
                    isPrimary: false,
                    isNullable: false,
                    comment: '주포지션',
                }, {
                    name: 'crt_dt',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: false,
                    default: 'current_timestamp',
                    comment: '생성일',
                }, {
                    name: 'edt_dt',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: false,
                    default: 'current_timestamp',
                    comment: '수정일',
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('subscribers_tb');
    }

}

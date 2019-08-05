import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClubs1564997640464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'clubs_tb',
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
                    length: '100',
                    isPrimary: false,
                    isNullable: false,
                    comment: '클럽명',
                }, {
                    name: 'main_place',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: '메인구장',
                }, {
                    name: 'description',
                    type: 'varchar',
                    length: '1000',
                    isPrimary: false,
                    isNullable: false,
                    comment: '설명',
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
        await queryRunner.dropTable('clubs_tb');
    }

}

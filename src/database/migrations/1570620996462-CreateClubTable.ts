import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClubTable1570620996462 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'club',
            columns: [
                {
                    name: 'idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: '클럽명',
                }, {
                    name: 'title',
                    type: 'varchar',
                    length: '500',
                    isPrimary: false,
                    isNullable: true,
                    comment: '소개타이틀',
                }, {
                    name: 'description',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                    comment: '소개설명',
                }, {
                    name: 'area',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                    comment: '지역명',
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
        await queryRunner.dropTable('club');
    }

}

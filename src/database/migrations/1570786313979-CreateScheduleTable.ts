import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateScheduleTable1570786313979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'schedule',
            columns: [
                {
                    name: 'idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: true,
                }, {
                    name: 'club_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: '클럽IDX',
                }, {
                    name: 'title',
                    type: 'varchar',
                    length: '500',
                    isPrimary: false,
                    isNullable: true,
                    comment: '제목',
                }, {
                    name: 'description',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                    comment: '설명!',
                }, {
                    name: 'st_dt',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: false,
                    comment: '일정시작시간',
                }, {
                    name: 'ed_dt',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: true,
                    comment: '일정시작시간',
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
        await queryRunner.dropTable('schedule');
    }
}

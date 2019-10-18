import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClubUserTable1570621344003 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'club_user',
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
                    name: 'user_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: '회원IDX',
                }, {
                    name: 'user_name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: false,
                    comment: '회원이름',
                }, {
                    name: 'job_title',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: false,
                    comment: '직책/직급',
                }, {
                    name: 'hb_position',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                    comment: '잘하는포지션',
                }, {
                    name: 'sb_position',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: true,
                    comment: '보조포지션',
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
        await queryRunner.dropTable('club_user');
    }

}

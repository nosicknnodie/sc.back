import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMatchTable1570786761535 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'match',
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
                    name: 'match_dt',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: false,
                    comment: '시합일',
                }, {
                    name: 'match_club_name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: true,
                    comment: '상대클럽명',
                }, {
                    name: 'self_yn',
                    type: 'char',
                    length: '1',
                    isPrimary: false,
                    isNullable: false,
                    comment: '자체경기여부',
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
        await queryRunner.dropTable('match');
    }

}

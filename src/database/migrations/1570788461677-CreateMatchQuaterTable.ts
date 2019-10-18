import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMatchQuaterTable1570788461677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'match_quater',
            columns: [
                {
                    name: 'idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: true,
                }, {
                    name: 'match_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: '매칭IDX',
                }, {
                    name: 'seq',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
                    comment: 'SEQ',
                }, {
                    name: 'l_team_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: 'L팀IDX',
                }, {
                    name: 'l_team_name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: false,
                    comment: 'L팀명',
                }, {
                    name: 'r_team_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: 'R팀IDX',
                }, {
                    name: 'r_team_name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: false,
                    comment: 'R팀명',
                }, {
                    name: 'referee',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: true,
                    comment: '심판',
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
        await queryRunner.dropTable('match_quater');
    }

}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClubTeamMemTable1570623063956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'club_team_mem',
            columns: [
                {
                    name: 'idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'club_team_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: '클럽팀IDX',
                }, {
                    name: 'club_user_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: '클럽회원IDX',
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: true,
                    comment: '멤버이름',
                }, {
                    name: 'num',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                    comment: '등번호',
                }, {
                    name: 'position_x',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                    comment: '포지션x',
                }, {
                    name: 'position_y',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                    comment: '포지션y',
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
        await queryRunner.dropTable('club_team_mem');
    }

}

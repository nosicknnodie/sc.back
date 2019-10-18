import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAccountRealtimeTable1570625518600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'account_realtime',
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
                    name: 'type_ie',
                    type: 'char',
                    length: '1',
                    isPrimary: false,
                    isNullable: false,
                    comment: '입출금타입I or E',
                }, {
                    name: 'price',
                    type: 'int',
                    isPrimary: false,
                    isNullable: false,
                    comment: '금액',
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: true,
                    comment: '입금자명',
                }, {
                    name: 'club_user_idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                    comment: '입금자 회원IDX',
                }, {
                    name: 'description',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                    comment: '비고',
                }, {
                    name: 'ie_dt',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: false,
                    comment: '입금일자',
                }, {
                    name: 'use_yn',
                    type: 'char',
                    length: '1',
                    isPrimary: false,
                    isNullable: true,
                    comment: '사용여부y or n defatul y',
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
        await queryRunner.dropTable('account_realtime');
    }

}

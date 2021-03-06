import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1511105183653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'user',
            columns: [
                {
                    name: 'idx',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    isUnique: true,
                    comment: '이메일',
                }, {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    comment: '암호',
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: false,
                    comment: '이름',
                }, {
                    name: 'en_name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: true,
                    comment: '영문이름',
                } , {
                    name: 'cl_name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: true,
                    comment: '옷상의이름',
                }, {
                    name: 'cl_top_size',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                    comment: '상의사이즈',
                }, {
                    name: 'cl_btm_size',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                    comment: '하의사이즈',
                }, {
                    name: 'both_dt',
                    type: 'date',
                    isPrimary: false,
                    isNullable: true,
                    comment: '생년월일',
                }, {
                    name: 'pf_position',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: true,
                    comment: '선호포지션',
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
        await queryRunner.dropTable('user');
    }

}

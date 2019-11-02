import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddUserRelationToUserTokenTable1572685006744 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_user_user_token',
        columnNames: ['user_idx'],
        referencedColumnNames: ['idx'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('user_token', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('user_token', this.tableForeignKey);
    }

}

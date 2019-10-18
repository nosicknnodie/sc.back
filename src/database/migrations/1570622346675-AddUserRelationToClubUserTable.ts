import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddUserRelationToClubUserTable1570622346675 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_user_club_user',
        columnNames: ['user_idx'],
        referencedColumnNames: ['idx'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('club_user', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('club_user', this.tableForeignKey);
    }
}

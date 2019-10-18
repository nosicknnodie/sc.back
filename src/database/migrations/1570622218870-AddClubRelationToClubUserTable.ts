import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddClubRelationToClubUserTable1570622218870 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_club_club_user',
        columnNames: ['club_idx'],
        referencedColumnNames: ['idx'],
        referencedTableName: 'club',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('club_user', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('club_user', this.tableForeignKey);
    }
}

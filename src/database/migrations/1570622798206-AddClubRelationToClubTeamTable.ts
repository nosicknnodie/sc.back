import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddClubRelationToClubTeamTable1570622798206 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_club_club_team',
        columnNames: ['club_idx'],
        referencedColumnNames: ['idx'],
        referencedTableName: 'club',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('club_team', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('club_team', this.tableForeignKey);
    }

}

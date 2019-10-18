import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddClubTeamRelationToClubTeamMemTable1570623843360 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_club_team_club_team_mem',
        columnNames: ['club_team_idx'],
        referencedColumnNames: ['idx'],
        referencedTableName: 'club_team',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('club_team_mem', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('club_team_mem', this.tableForeignKey);
    }

}

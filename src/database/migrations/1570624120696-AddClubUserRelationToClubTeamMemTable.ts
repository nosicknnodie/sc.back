import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddClubUserRelationToClubTeamMemTable1570624120696 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_club_user_club_team_mem',
        columnNames: ['club_user_idx'],
        referencedColumnNames: ['idx'],
        referencedTableName: 'club_user',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('club_team_mem', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('club_team_mem', this.tableForeignKey);
    }
}

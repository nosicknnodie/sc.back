import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddClubRelationToMatchTable1570788393026 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_club_match',
        columnNames: ['club_idx'],
        referencedColumnNames: ['idx'],
        referencedTableName: 'club',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('match', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('match', this.tableForeignKey);
    }

}

import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddClubRelationToAccountAllTable1570626943718 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_club_account_all',
        columnNames: ['club_idx'],
        referencedColumnNames: ['idx'],
        referencedTableName: 'club',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('account_all', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('account_all', this.tableForeignKey);
    }

}

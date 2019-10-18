import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddClubRelationToAccountRealtimeTable1570626078545 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_club_account_realtime',
        columnNames: ['club_idx'],
        referencedColumnNames: ['idx'],
        referencedTableName: 'club',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('account_realtime', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('account_realtime', this.tableForeignKey);
    }

}

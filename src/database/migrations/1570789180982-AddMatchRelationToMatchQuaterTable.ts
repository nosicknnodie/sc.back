import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddMatchRelationToMatchQuaterTable1570789180982 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_match_match_quater',
        columnNames: ['match_idx'],
        referencedColumnNames: ['idx'],
        referencedTableName: 'match',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('match_quater', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('match_quater', this.tableForeignKey);
    }

}

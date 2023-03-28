import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"
import { DBTable } from "../../constants/DBTable"

export class CreateTokensTable1679977778839 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: DBTable.TOKENS,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        isUnique: true
                    },
                    {
                        name: "token",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "tokenExpiration",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "userId",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false
                    }
                ]
            }),
            true
        )

        await queryRunner.createForeignKey(
            DBTable.TOKENS,
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: DBTable.USERS,
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DBTable.TOKENS)
    }

}

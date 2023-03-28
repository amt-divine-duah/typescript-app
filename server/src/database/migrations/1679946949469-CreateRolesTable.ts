import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { DBTable } from "../../constants/DBTable"
import { ROLES } from "../../constants/Roles"

export class CreateRolesTable1679946949469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: DBTable.ROLES,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isGenerated: true,
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                        default: ROLES.USER
                    }
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DBTable.ROLES)
    }

}

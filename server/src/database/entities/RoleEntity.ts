import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DBTable } from "../../constants/DBTable";
import { ROLES } from "../../constants/Roles";

@Entity(DBTable.ROLES)
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column( {nullable: false, default: ROLES.USER} )
    name: string
}
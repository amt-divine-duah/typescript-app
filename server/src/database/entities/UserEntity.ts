import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm"
import { DBTable } from "../../constants/DBTable"

@Entity(DBTable.USERS)
export class UserEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({unique: true})
    username: string

    @Column({unique: true})
    email: string

    @CreateDateColumn()
    createdAt: Date
}
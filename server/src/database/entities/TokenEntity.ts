import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"
import { DBTable } from "../../constants/DBTable"

@Entity(DBTable.TOKENS)
export class TokenEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    token: string

    @Column({ nullable: false })
    tokenExpiration: Date

    @CreateDateColumn()
    createdAt: Date
}
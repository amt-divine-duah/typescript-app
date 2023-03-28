import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { DBTable } from "../../constants/DBTable"
import { UserEntity } from "./UserEntity"

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

    @ManyToOne(() => UserEntity, (user) => user.tokens)
    user: UserEntity

}
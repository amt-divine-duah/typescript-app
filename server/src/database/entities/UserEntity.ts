import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert} from "typeorm"
import { DBTable } from "../../constants/DBTable"
import { hash } from "bcryptjs"

@Entity(DBTable.USERS)
export class UserEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique: true})
    username: string

    @Column({unique: true})
    email: string

    @Column({nullable: false})
    password: string

    @Column({ nullable: false, default: false })
    confirmed: boolean

    @CreateDateColumn()
    createdAt: Date

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 12)
    }
}
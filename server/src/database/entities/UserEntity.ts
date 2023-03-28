import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import { DBTable } from "../../constants/DBTable";
import { hash } from "bcryptjs";
import { RoleEntity } from "./RoleEntity";
import { GeneralUtils } from "../../utils/GeneralUtils";

@Entity(DBTable.USERS)
export class UserEntity {
    
  // Constructor to initialize default role if none is given
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
    (async () => {
      if (!this.role) {
        this.role = await GeneralUtils.getDefaultRole();
      }
    })();
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: false })
  confirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn()
  role: RoleEntity | null;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }
}

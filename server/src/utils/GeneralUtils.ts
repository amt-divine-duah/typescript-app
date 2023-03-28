import configValues from "../config/config"
import { ROLES } from "../constants/Roles";
import { AppDataSource } from "../database/data-source"
import { RoleEntity } from "../database/entities/RoleEntity"

export class GeneralUtils {

    // Get a default Role
    static async getDefaultRole() {
        const role = await AppDataSource.getRepository(RoleEntity).findOneBy({
            name: ROLES.USER
          });
          return role;        
    }
}
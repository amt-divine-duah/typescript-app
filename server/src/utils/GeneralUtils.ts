import configValues from "../config/config"
import { ROLES } from "../constants/Roles";
import { AppDataSource } from "../database/data-source"
import { RoleEntity } from "../database/entities/RoleEntity"
import jwt from "jsonwebtoken";
import { UserEntity } from "../database/entities/UserEntity";

export class GeneralUtils {

    // Get a default Role
    static async getDefaultRole() {
        const role = await AppDataSource.getRepository(RoleEntity).findOneBy({
            name: ROLES.USER
          });
          return role;        
    }

    // Generate JWT Token
    static generateJWT(payload: object, options?: object) {
        // GET SECRET KEY
        const secretKey = configValues.SECRET_KEY
        const defaultOptions = {
            expiresIn: configValues.JWT_TOKEN_EXPIRATION
        }

        return jwt.sign(payload, secretKey, Object.assign(defaultOptions, options))
    }


    // Generate Login Token
    static generateAuthToken(user: UserEntity) {
        const accessToken = this.generateJWT(
            {
                id: user.id,
                tokenType: "user_access"
            }
        )
        return {
            "accessToken": accessToken
        }
    }

    // Get token Expiration Time
    static getTokenExpiration(token: string) {

        const decoded = jwt.verify(token, configValues.SECRET_KEY)

        if (typeof decoded === "object") {
            return decoded.exp
        }
        throw new Error("Token does not contain expiration")
    }
}
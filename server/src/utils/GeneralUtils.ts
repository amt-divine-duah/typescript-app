import configValues from "../config/config"
import { ROLES } from "../constants/Roles";
import { AppDataSource } from "../database/data-source"
import { RoleEntity } from "../database/entities/RoleEntity"
import jwt from "jsonwebtoken";
import { UserEntity } from "../database/entities/UserEntity";
import { TokenType } from "../constants/TokenType";

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
                tokenType: TokenType.USER_AUTH
            }
        )
        return {
            "accessToken": accessToken
        }
    }

    // Generate confirmation Token
    static generateConfirmationToken(user: UserEntity) {
        const accessToken = this.generateJWT(
            {
                id: user.id,
                tokenType: TokenType.CONFIRM_ACCOUNT
            }
        )
        return {
            "accessToken": accessToken
        }
    }

    // Generate password Reset Token
    static generatePasswordResetToken(user: UserEntity) {
        const accessToken = this.generateJWT(
            {
                id: user.id,
                tokenType: TokenType.FORGOT_PASSWORD,
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

    // Validate JWT TOKEN
    static validateJWT(token: string) {
        try {
            return jwt.verify(token, configValues.SECRET_KEY)
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
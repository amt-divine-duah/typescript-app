import { TokenType } from "../../src/constants/TokenType"
import { GeneralUtils } from "../../src/utils/GeneralUtils"
import { TestHelper } from "../testHelper"

beforeAll(async () => {
    await TestHelper.setupTestDB()
})

afterAll(async () => {
    await TestHelper.tearDownTestDB()
})


describe("Generate JWT Token", () => {
    const payload = {
        id: 123,
        tokenType: TokenType.USER_AUTH
    }
    const expiresIn = "30m"

    test("It should generate a valid JWT token", () => {
        const token = GeneralUtils.generateJWT(payload, {expiresIn})
        expect(token).toBeDefined()
    })
})

describe("Expired JWT token", () => {
    const payload = {
        id: 123,
        tokenType: TokenType.USER_AUTH
    }
    const expiresIn = "1s"
    test("It should check for expired token", () => {
        const token = GeneralUtils.generateJWT(payload, {expiresIn})
        const timer = setTimeout(() => {
            expect(GeneralUtils.validateJWT(token)).toBeFalsy()
        }, 5000);
        timer.unref();
    })
})
import { TestHelper } from "../testHelper"

beforeAll(async () => {
    await TestHelper.setupTestDB()
})

afterAll(async () => {
    await TestHelper.tearDownTestDB()
})

describe('Sample test', () => {
    test("This is a sample test", () => {
        expect(2+2).toBe(4)
    })
})
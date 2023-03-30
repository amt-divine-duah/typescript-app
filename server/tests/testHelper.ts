import "reflect-metadata";
import { DataSource } from "typeorm";
import SqliteDatabase, { Database } from "better-sqlite3";
import { RoleEntity } from "../src/database/entities/RoleEntity";
import { UserEntity } from "../src/database/entities/UserEntity";
import { TokenEntity } from "../src/database/entities/TokenEntity";
import configValues from "../src/config/config";

export class TestHelper {
  static testdb: Database;
  static AppDataSource: DataSource;
  static async setupTestDB() {
    this.testdb = new SqliteDatabase("testdb", { verbose: console.log });

    this.AppDataSource = new DataSource({
      type: "better-sqlite3",
      database: "testdb",
      entities: [RoleEntity, UserEntity, TokenEntity],
      synchronize: false,
      logging: true,
    });
    await this.AppDataSource.initialize();
    try {
      console.log("Test Database connection created successfully");
    } catch (error) {
      console.log("I have an error", error);
    }
  }

  static async tearDownTestDB() {
    await this.AppDataSource.destroy();
    console.log("Destroy Database");
    this.testdb.close();
  }
}

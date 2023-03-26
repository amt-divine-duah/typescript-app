import { faker } from "@faker-js/faker";
import { UserEntity } from "../database/entities/UserEntity";
import { AppDataSource } from "../database/data-source";


AppDataSource.initialize()
  .then(async () => {

    // Generate fake users
    const count = 100;
    for (let i = 0; i < count; i++) {
      // Use transaction to skip Query Failed Errors
      try {
        await AppDataSource.transaction(async (transactionalEntityManager) => {
          const user = transactionalEntityManager.create(UserEntity, {
            username: faker.name.firstName(),
            email: faker.internet.email(),
          });
          await transactionalEntityManager.save(user);
        });
      } catch (error) {
        console.log(error, "Error occurred");
      }
    }
    // Close the connection
    await AppDataSource.destroy();
  })
  .catch((err) => {
    console.log(err, "Error occurred");
  });


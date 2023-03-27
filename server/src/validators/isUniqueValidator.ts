import { CustomHelpers } from "joi";
import { Not, Repository } from "typeorm";

interface UserData {
  id: number;
  name: string;
  email: string;
}

export const isUnique =
  (repository: Repository<any>, property: string, message?: string) =>
  async (value: string, helpers: CustomHelpers) => {
    // Check if there is an Id, means it is an update
    const userId = helpers.state.ancestors[0]?.id;
    const isUpdate = userId !== undefined;
    // Check for item duplicate
    if (isUpdate) {
        // Exclude the id we are checking
      const item = await repository.findOne({ where: { [property]: value, id: Not(userId) } });
      if (item) {
        const errorMsg = message || `${property} already exists`;
        return helpers.message({ external: errorMsg });
      }
    } else {
      const item = await repository.findOne({ where: { [property]: value } });
      if (item) {
        const errorMsg = message || `${property} already exists`;
        return helpers.message({ external: errorMsg });
      }
    }
    return value;
  };

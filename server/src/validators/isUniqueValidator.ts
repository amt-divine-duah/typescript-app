import { CustomHelpers } from "joi";
import { Repository } from "typeorm";

export const isUnique =
  (repository: Repository<any>, property: string, message?: string) =>
  async (value: string, helpers: CustomHelpers) => {
    
    // Check for item duplicate
    const item = await repository.findOne({ where: { [property]: value } });
    if (item) {
      const errorMsg = message || `${property} already exists`;
      return helpers.message({ external: errorMsg });
    }
    return value;
  };

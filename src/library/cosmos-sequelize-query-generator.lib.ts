import { Request, Responsee, NextFunction } from 'express';

class CosmosSequelizeQueryGeneratorLib {

  static generateWhereConditionForDelete(query: any, where: any) {

  }

  static generateDeleteQueryOptions(req: Request, originalOptions: any = {}) {
    const options = {
      ...originalOptions,
      where: {
        id: where.id,
      },
    };

    return options;
  }
}

export default CosmosSequelizeQueryGeneratorLib;

import { Model } from 'sequelize';

class CosmosModelStoreSingleton {
  private static instance: CosmosModelStoreSingleton;

  private sequelizeModelMap: Map<string, unknown>;

  private constructor() {
    this.sequelizeModelMap = new Map<string, Model>();
  }

  public static getInstance(): CosmosModelStoreSingleton {
    if (!CosmosModelStoreSingleton.instance) {
      CosmosModelStoreSingleton.instance = new CosmosModelStoreSingleton();
    }

    return CosmosModelStoreSingleton.instance;
  }

  public registerSequelizeModel(sequelizeModelName: string, sequelizeModel: unknown) {
    this.sequelizeModelMap.set(sequelizeModelName, sequelizeModel);
  }

  public getSequelizeModel(sequelizeModelName: string): any {
    return this.sequelizeModelMap.get(sequelizeModelName);
  }
}

export default CosmosModelStoreSingleton;

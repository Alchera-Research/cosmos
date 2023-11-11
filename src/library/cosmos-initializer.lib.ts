import { Express } from 'express';

import CosmosModelStoreSingleton from '../store/cosmos-model-store.singleton';

class CosmosInitializer {
  private static expressInstance: Express;

  private static instance: CosmosInitializer;

  private cosmosModelStore: CosmosModelStoreSingleton;

  private constructor() {
    this.cosmosModelStore = CosmosModelStoreSingleton.getInstance();
  }

  static getInstance(): CosmosInitializer {
    if (!CosmosInitializer.instance) {
      CosmosInitializer.instance = new CosmosInitializer();
    }

    return CosmosInitializer.instance;
  }

  static registerExpressApp(expressInstance: Express) {
    CosmosInitializer.getInstance();

    CosmosInitializer.expressInstance = expressInstance;
    // TODO: add hook middleware here
    //  - such as.. this.expressInstance.use(cosmosMiddleware);
  }

  static registerCosmosModelStore(cosmosModelStore: CosmosModelStoreSingleton) {
    CosmosInitializer.getInstance();

    CosmosInitializer.instance.cosmosModelStore = cosmosModelStore;
  }
}

export default CosmosInitializer;

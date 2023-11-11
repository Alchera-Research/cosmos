import { Request, Response, NextFunction } from 'express';
import CosmosModelStoreSingleton from 'src/store/cosmos-model-store.singleton';

const cosmosModelStore = CosmosModelStoreSingleton.getInstance();

class CosmosController {
  // static async load(controllerParams: ControllerParams) {
  //   controllerParams?.expressParams?.res.send('cosmos middleware');
  // }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const targetModel = cosmosModelStore.getSequelizeModel('user');
    console.log('cosmos.controller.create:c-1:: ', targetModel);

    const queryResult = await targetModel?.create(req.body);
    console.log('cosmos.controller.create:c-2:: ', queryResult);

    res.status(201).json(queryResult);
  }
}

export default CosmosController;

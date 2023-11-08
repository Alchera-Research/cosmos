import { Request, Response, NextFunction } from 'express';
import UserModel from '../sample-project-for-test/restful-apps/user/user.model';
// TODO: for manage all Model need to implement Centralized Model Store
//   - such as.. SequelizeModelStore.register(user);
//   - and then.. SequelizeModelStore.get('user');

class CosmosController {

  // static async load(controllerParams: ControllerParams) {
  //   controllerParams?.expressParams?.res.send('cosmos middleware');
  // }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const queryResult = await UserModel?.create(req.body);

    res.status(201).json(queryResult);
  }
}

export default CosmosController;

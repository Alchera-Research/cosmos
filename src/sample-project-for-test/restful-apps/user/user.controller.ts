import { Request, Response, NextFunction } from 'express';
import CosmosController from 'src/controller/cosmos.controller';

class UserController extends CosmosController {
  static async create(req: Request, res: Response, next: NextFunction) {
    return super.create(req, res, next);
  }
}

export default UserController;

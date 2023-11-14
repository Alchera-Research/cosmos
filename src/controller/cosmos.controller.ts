import pluralize from 'pluralize';
import { Request, Response, NextFunction } from 'express';

import CosmosModelStoreSingleton from 'src/store/cosmos-model-store.singleton';
import { ExpressUrlParserLib } from '../library/express-url-parser.lib';

const cosmosModelStore = CosmosModelStoreSingleton.getInstance();

class CosmosController {
  // static async load(controllerParams: ControllerParams) {
  //   controllerParams?.expressParams?.res.send('cosmos middleware');
  // }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
    isRestful: boolean = true,
  ): Promise<void> {
    const parsedUrl = ExpressUrlParserLib.parseUrl(req);
    const firstLayerModelName = parsedUrl[0].layerName || '';
    const singulizedModelName: string = pluralize.singular(firstLayerModelName);
    const targetModel = cosmosModelStore.getSequelizeModel(singulizedModelName);
    const queryResult = await targetModel?.create(req.body);

    res.status(201).json(queryResult);
  }
}

export default CosmosController;

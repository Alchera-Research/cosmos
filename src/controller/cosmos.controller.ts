import pluralize from 'pluralize';
import { Request, Response, NextFunction } from 'express';

import CosmosModelStoreSingleton from 'src/store/cosmos-model-store.singleton';
import { ExpressUrlParserLib } from '../library/express-url-parser.lib';

const cosmosModelStore = CosmosModelStoreSingleton.getInstance();

class CosmosController {
  static getModelNameFromUrl(req: Request, res: Response, next: NextFunction) {
    const parsedUrl = ExpressUrlParserLib.parseUrl(req);
    const firstLayerModelName = parsedUrl[0].layerName || '';
    const singulizedModelName: string = pluralize.singular(firstLayerModelName);

    if (!res.locals.cosmos) {
      res.locals.cosmos = {};
    }

    res.locals.cosmos.parsedUrl = parsedUrl;
    res.locals.cosmos.firstLayerModelName = firstLayerModelName;
    res.locals.cosmos.singulizedModelName = singulizedModelName;

    return singulizedModelName;
  }

  static getModel(req: Request, res: Response, next: NextFunction): any {
    const targetModelName = CosmosController.getModelNameFromUrl(req, res, next);
    const targetModel = cosmosModelStore.getSequelizeModel(targetModelName);

    return targetModel;
  }

  static async load(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const targetModel = CosmosController.getModel(req, res, next);
    const targetId = res.locals.cosmos.parsedUrl[0].layerParam;
    const queryResult = await targetModel?.findByPk(targetId);

    res.locals.cosmos[res.locals.cosmos.singulizedModelName] = queryResult;
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
    isRestful: boolean = true,
  ) {
    const parsedUrl = ExpressUrlParserLib.parseUrl(req);
    const firstLayerModelName = parsedUrl[0].layerName || '';
    const singulizedModelName: string = pluralize.singular(firstLayerModelName);
    const targetModel = cosmosModelStore.getSequelizeModel(singulizedModelName);
    const queryResult = await targetModel?.create(req.body);

    res.status(201).json(queryResult);
  }

  static async get(
    req: Request,
    res: Response,
    next: NextFunction,
    isRestful: boolean = true,
  ) {
    const queryResult = await CosmosController.load(req, res, next);

    res.status(200).json(queryResult);
  }
}

export default CosmosController;

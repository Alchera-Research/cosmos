import pluralize from 'pluralize';
import { NextFunction, Request, Response } from 'express';

import { ExpressUrlParserLib } from './express-url-parser.lib';
import CosmosModelStoreSingleton from '../store/cosmos-model-store.singleton';

const cosmosModelStore = CosmosModelStoreSingleton.getInstance();

class CosmosModelLib {
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
    const targetModelName = CosmosModelLib.getModelNameFromUrl(req, res, next);
    const targetModel = cosmosModelStore.getSequelizeModel(targetModelName);

    if (!res.locals.cosmos.model) {
      res.locals.cosmos.model = {};
    }
    res.locals.cosmos.model[targetModelName] = targetModel;

    return targetModel;
  }

  static async getSingularizedModelName(req: Request) {
    const parsedUrl = ExpressUrlParserLib.parseUrl(req);
    const firstLayerModelName = parsedUrl[0].layerName || '';
    const singulizedModelName: string = pluralize.singular(firstLayerModelName);

    return singulizedModelName;
  }

  static async getTargetModel(req: Request) {
    const singulizedModelName = await CosmosModelLib.getSingularizedModelName(req);
    const targetModel = cosmosModelStore.getSequelizeModel(singulizedModelName);

    return targetModel;
  }
}

export default CosmosModelLib;

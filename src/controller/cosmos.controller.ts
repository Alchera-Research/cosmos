import pluralize from 'pluralize';
import { Request, Response, NextFunction } from 'express';

import CosmosModelStoreSingleton from 'src/store/cosmos-model-store.singleton';
import { ExpressUrlParserLib } from '../library/express-url-parser.lib';
import CosmosModelLib from '../library/cosmos-model.lib';

const cosmosModelStore = CosmosModelStoreSingleton.getInstance();

class CosmosController {

  static async loadIdData(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const targetModel = CosmosModelLib.getModel(req, res, next);
    const targetId = res.locals.cosmos.parsedUrl[0].layerParam;
    const queryResult = await targetModel?.findByPk(targetId);

    res.locals.cosmos[res.locals.cosmos.singulizedModelName] = queryResult;

    return queryResult;
  }

  static async bulkCreate(
    req: Request,
    res: Response,
    next: NextFunction,
    isRestful: boolean = true,
  ) {
    const parsedUrl = ExpressUrlParserLib.parseUrl(req);
    const firstLayerModelName = parsedUrl[0].layerName || '';
    const singulizedModelName: string = pluralize.singular(firstLayerModelName);
    const targetModel = cosmosModelStore.getSequelizeModel(singulizedModelName);
    const queryResult = await targetModel?.bulkCreate(req.body);

    res.status(201).json(queryResult);
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
    isRestful: boolean = true,
  ) {
    if (Array.isArray(req.body)) {
      return CosmosController.bulkCreate(req, res, next, isRestful);
    }

    const parsedUrl = ExpressUrlParserLib.parseUrl(req);
    const firstLayerModelName = parsedUrl[0].layerName || '';
    const singulizedModelName: string = pluralize.singular(firstLayerModelName);
    const targetModel = cosmosModelStore.getSequelizeModel(singulizedModelName);
    const queryResult = await targetModel?.create(req.body);

    res.status(201).json(queryResult);
  }

  static async bulkRead(
    req: Request,
    res: Response,
    next: NextFunction,
    isRestful: boolean = true,
  ) {
    const parsedUrl = ExpressUrlParserLib.parseUrl(req);
    const firstLayerModelName = parsedUrl[0].layerName || '';
    const singulizedModelName: string = pluralize.singular(firstLayerModelName);
    const targetModel = cosmosModelStore.getSequelizeModel(singulizedModelName);
    const queryResult = await targetModel?.findAll();

    res.status(200).json(queryResult);
  }

  static async read(
    req: Request,
    res: Response,
    next: NextFunction,
    isRestful: boolean = true,
  ) {
    const queryResult = await CosmosController.loadIdData(req, res, next);

    res.status(200).json(queryResult);
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction,
    isRestful: boolean = true,
  ) {
    const queryResult = await CosmosController.loadIdData(req, res, next) || {};
    const updateValue = {
      ...(queryResult.dataValues),
      ...req.body,
    };
    const targetModel = res.locals.cosmos.model[res.locals.cosmos.singulizedModelName];
    console.log('res.locals.cosmos', res.locals.cosmos);
    console.log('targetModel', targetModel);
    console.log('updateValue', updateValue);
    console.log(res.locals.cosmos.parsedUrl[0].layerParam);

    // NOTE: update not working. I don't know why.

    const [affectedRows, numberOfAffectedRows] = await targetModel?.update(
      updateValue,
      {
        where: {
          id: res.locals.cosmos.parsedUrl[0].layerParam,
        },
        returning: ['*'],
      },
    );

    let updatedModelQueryResult = affectedRows;

    if (!affectedRows && numberOfAffectedRows) {
      updatedModelQueryResult = await targetModel?.findByPk(res.locals.cosmos.parsedUrl[0].layerParam);
    }

    res.status(200).json(updatedModelQueryResult);
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction,
    isRestful: boolean = true,
  ) {
    const queryResult = await CosmosController.loadIdData(req, res, next);
    const targetModel = res.locals.cosmos.model[res.locals.cosmos.singulizedModelName];

    await targetModel?.destroy({
      where: {
        id: res.locals.cosmos.parsedUrl[0].layerParam,
      },
    });

    res.status(204).json(queryResult);
  }

}

export default CosmosController;

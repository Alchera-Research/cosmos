import { Request, Response, NextFunction } from 'express';

import CosmosModelStoreSingleton from 'src/store/cosmos-model-store.singleton';
import CosmosModelLib from '../library/cosmos-model.lib';

const cosmosModelStore = CosmosModelStoreSingleton.getInstance();

class CosmosController {

  static async loadIdData(req: Request, res: Response, next: NextFunction) {
    const targetModel = CosmosModelLib.getModel(req, res, next);
    const targetId = res.locals.cosmos.parsedUrl[0].layerParam;
    const queryResult = await targetModel?.findByPk(targetId);

    res.locals.cosmos[res.locals.cosmos.singulizedModelName] = queryResult;

    return queryResult;
  }

  static async bulkCreate(req: Request, res: Response, next: NextFunction, isRestful: boolean = true) {
    const targetModel = await CosmosModelLib.getTargetModel(req);
    const queryResult = await targetModel?.bulkCreate(req.body);

    res.status(201).json(queryResult);
  }

  static async create(req: Request, res: Response, next: NextFunction, isRestful: boolean = true) {
    if (Array.isArray(req.body)) {
      return CosmosController.bulkCreate(req, res, next, isRestful);
    }

    const targetModel = await CosmosModelLib.getTargetModel(req);
    const queryResult = await targetModel?.create(req.body);

    res.status(201).json(queryResult);
  }

  static async bulkRead(req: Request, res: Response, next: NextFunction, isRestful: boolean = true) {
    const targetModel = await CosmosModelLib.getTargetModel(req);
    const queryResult = await targetModel?.findAll();

    res.status(200).json(queryResult);
  }

  static async read(req: Request, res: Response, next: NextFunction, isRestful: boolean = true) {
    const queryResult = await CosmosController.loadIdData(req, res, next);

    res.status(200).json(queryResult);
  }


  static async updateSingleRowOperation(
    req: Request,
    res: Response,
    next: NextFunction,
    options: any) {
    const [affectedRows, numberOfAffectedRows] = await options?.targetModel?.update(
      options?.body,
      {
        where: {
          id: options?.body?.id,
        },
        returning: ['*'],
      });

    let updatedModelQueryResult = affectedRows;

    if (!affectedRows && numberOfAffectedRows) {
      updatedModelQueryResult = await options?.targetModel?.findByPk(options?.body?.id);
    }

    return updatedModelQueryResult;
  }

  static async bulkUpdate(req: Request, res: Response, next: NextFunction) {
    const targetModel = await CosmosModelLib.getTargetModel(req);
    const resultList = [];

    for (let i = 0; i < req.body.length; i++) {
      const queryResult = await CosmosController.updateSingleRowOperation(
        req,
        res,
        next,
        {
          body: req.body[i],
          targetModel: targetModel,
        });

      resultList.push(queryResult);
    }

    res.status(200).json(resultList);
  }

  static async update(req: Request, res: Response, next: NextFunction, isRestful: boolean = true) {
    const queryResult = await CosmosController.loadIdData(req, res, next) || {};
    const updateValue = {
      ...(queryResult.dataValues),
      ...req.body,
    };
    const targetModel = res.locals.cosmos.model[res.locals.cosmos.singulizedModelName];
    const updatedModelQueryResult = await CosmosController.updateSingleRowOperation(
      req,
      res,
      next,
      {
        body: updateValue,
        targetModel: targetModel,
      });

    res.status(200).json(updatedModelQueryResult);
  }

  static async delete(req: Request, res: Response, next: NextFunction, isRestful: boolean = true) {
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

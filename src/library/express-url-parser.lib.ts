import { Request } from 'express';

type UrlLayer = {
  layerDepth: number;
  layerName: string | undefined;
  layerParam: string | undefined;
};

class ExpressUrlParserLib {
  static parseUrl(req: Request): UrlLayer[] {
    const pathParts = req.path.split('/').filter(Boolean);
    const paramKeys = Object.keys(req.params);

    let parsedLayers2 = [];

    while (pathParts.length > 0) {
      const part: string | undefined = pathParts.shift();
      let hasParam = false;
      let targetParam;

      if (part !== undefined) {
        hasParam = paramKeys.includes(part);

        if (hasParam) {
          targetParam = req.params[part];
        }
      }

      parsedLayers2.push({
        layerDepth: pathParts.length,
        layerName: part,
        layerParam: targetParam,
      });

      if (targetParam && targetParam.length > 0 && targetParam === pathParts[0]) {
        pathParts.shift();
      }
    }

    parsedLayers2 = parsedLayers2.reverse();
    parsedLayers2 = parsedLayers2.map((layer, index) => {
      const layerCopy = layer;
      layerCopy.layerDepth = index;

      return layerCopy;
    });

    return parsedLayers2;
  }
}

export {
  ExpressUrlParserLib,
  UrlLayer,
};

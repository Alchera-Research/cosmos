import express from 'express';
import { ExpressUrlParserLib } from './express-url-parser.lib';
import request from 'supertest';

describe('Integration::APT::express-url-parser.lib.test.ts', () => {

  const app = express();

  describe('GET /a/:a/b//c/:c/d', () => {

    it('APT::normal-case-001: should respond with "200 ok" on root path', async () => {
      const routerPattern = '/a/:a/b/c/:c/d';
      const targetUrl = '/a/1/b/c/2/d';


      app.route(routerPattern)
        .get((req, res) => {
          res.send(ExpressUrlParserLib.parseUrl(req));
        });

      const expectedResult = [
        { layerDepth: 0, layerName: 'd' },
        { layerDepth: 1, layerName: 'c', layerParam: '2' },
        { layerDepth: 2, layerName: 'b' },
        { layerDepth: 3, layerName: 'a', layerParam: '1' },
      ];

      const response = await request(app).get(targetUrl);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(expectedResult);
    });

    it('APT::normal-case-002: should respond with "200 ok"', async () => {
      const routerPattern = '/a/:a/b/:b/c/:c/d';
      const targetUrl = '/a/1/b/2/c/3/d';

      app.route(routerPattern)
        .post((req, res) => {
          res.send(ExpressUrlParserLib.parseUrl(req));
        });


      const expectedResult = [
        { layerDepth: 0, layerName: 'd' },
        { layerDepth: 1, layerName: 'c', layerParam: '3' },
        { layerDepth: 2, layerName: 'b', layerParam: '2' },
        { layerDepth: 3, layerName: 'a', layerParam: '1' },
      ];

      const response = await request(app).post(targetUrl);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(expectedResult);
    });
  });
});

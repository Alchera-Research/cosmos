import request from 'supertest';
import app from '../../index';

describe('Integration::APT::user.middleware.test.ts', () => {
  let userId: string;

  describe('POST /users', () => {
    it('APT::normal-case-002: should respond with "201 created" on root path', async () => {
      const userBody = {
        name: 'test',
        email: 'test@example.com',
      };

      const response = await request(app).post('/users?meaningless-query-for-test=1')
        .send(userBody);
      userId = response.body.id;

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(userBody);
    });
  });

  describe('GET /users', () => {
    it('APT::normal-case-001: should respond with "200 ok" on root path', async () => {
      const targetUrl = `/users/${userId}`;
      const response = await request(app).get(targetUrl);

      console.log('response.body', response.body);
      expect(response.status).toBe(200);
    });
  });

  // it('APT::abnormal-case-001: should handle errors and respond with 500 and the proper message', async () => {
  //   const response = await request(app).get('/error');
  //
  //   expect(response.status).toBe(500);
  //   expect(response.body).toBe('Something went wrong');
  // });
});

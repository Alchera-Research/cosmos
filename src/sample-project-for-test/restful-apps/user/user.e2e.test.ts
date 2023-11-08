import request from 'supertest';
import app from '../../index';

describe('Integration::APT::user.middleware.test.ts', () => {

  describe('GET /users', () => {
    it('APT::normal-case-001: should respond with "200 ok" on root path', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.text).toBe('user middleware');
    });
  });

  describe('POST /users', () => {
    it('APT::normal-case-002: should respond with "200 ok" on root path', async () => {
      const userBody = {
        name: 'test',
        email: 'test@example.com',
      };

      const response = await request(app).post('/users')
        .send(userBody);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(userBody);
    });
  });


  // it('APT::abnormal-case-001: should handle errors and respond with 500 and the proper message', async () => {
  //   const response = await request(app).get('/error');
  //
  //   expect(response.status).toBe(500);
  //   expect(response.body).toBe('Something went wrong');
  // });
});

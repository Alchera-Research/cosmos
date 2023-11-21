import request from 'supertest';
import app from '../../index';

describe('Integration::APT::user.e2e.test.ts', () => {
  let userId: string;

  describe('Basic CRUD', () => {
    const userBody = {
      name: 'test',
      email: 'test@example.com',
    };

    describe('POST /users', () => {
      it('APT::normal-case-002: should respond with "201 created" on root path', async () => {
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

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(userBody);
      });
    });


    describe('PUT /users', () => {
      it('APT::normal-case-001: should respond with "200 ok" on root path', async () => {
        const targetUrl = `/users/${userId}`;
        const userBody = {
          name: 'updatedValue',
          email: 'updatedValue@example.com',
        };

        const response = await request(app).put(targetUrl)
          .send(userBody);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(userBody);
        console.log('response.body', response.body);
      });
    });

    describe('DELETE /users', () => {
      it('APT::normal-case-001: should respond with "200 ok" on root path', async () => {
        const targetUrl = `/users/${userId}`;
        const response = await request(app).delete(targetUrl);

        expect(response.status).toBe(204);
        expect(response.body).toMatchObject({});
      });
    });
  });

  describe('bulk CRUD', () => {
    const userBodies = [
      { name: 'test1', email: 'test1@example.com' },
      { name: 'test2', email: 'test2@example.com' },
      { name: 'test3', email: 'test3@example.com' },
      { name: 'test4', email: 'test4@example.com' },
      { name: 'test5', email: 'test5@example.com' },
      { name: 'test6', email: 'test6@example.com' },
      { name: 'test7', email: 'test7@example.com' },
      { name: 'test8', email: 'test8@example.com' },
      { name: 'test9', email: 'test9@example.com' },
      { name: 'test10', email: 'test10@example.com' },
    ];

    describe('POST /users bulkCreate', () => {
      it('APT::normal-case-001: should respond with "201 created" on root path', async () => {
        const response = await request(app).post('/users')
          .send(userBodies);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(userBodies);
      });

    });
  });
});
// it('APT::abnormal-case-001: should handle errors and respond with 500 and the proper message', async () => {
//   const response = await request(app).get('/error');
//
//   expect(response.status).toBe(500);
//   expect(response.body).toBe('Something went wrong');
// });


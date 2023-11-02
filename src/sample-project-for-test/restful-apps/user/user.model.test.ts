import User from './user.model';
import sequelize from 'src/sample-project-for-test/common/sequelize.util';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // This will reset the database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after all tests
});

describe('User CRUD operations', () => {
  let userUUID: string;

  // CREATE
  it('should create a new user', async () => {
    try {
      const user = await User.create({ name: 'John Doe', email: 'john@example.com' });
      userUUID = user.dataValues.id;

      expect(user.dataValues.name).toBe('John Doe');
    } catch (e) {
      console.log(e);
    }
  });

  // READ
  it('should fetch the user', async () => {
    const user = await User.findByPk(userUUID);
    expect(user?.dataValues.name).toBe('John Doe');
  });

  // UPDATE
  it('should update the user details', async () => {
    await User.update({ name: 'Jane Doe' }, { where: { id: userUUID } });
    const user = await User.findByPk(userUUID);
    expect(user?.dataValues.name).toBe('Jane Doe');
  });

  // DELETE
  it('should delete the user', async () => {
    await User.destroy({ where: { id: userUUID } });
    const user = await User.findByPk(userUUID);
    expect(user).toBeNull();
  });
});

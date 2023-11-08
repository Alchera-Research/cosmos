import { Model, DataTypes } from 'sequelize';
import sequelize from 'src/sample-project-for-test/common/sequelize.util';

class User extends Model {
  public id!: string;
  public name?: string;
  public email?: string;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
  }
}, {
  tableName: 'users',
  sequelize,
});

export default User;

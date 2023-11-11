import CosmosModelStoreSingleton from '../../store/cosmos-model-store.singleton';
import User from './user/user.model';

const cosmosModelStoreSingleton = CosmosModelStoreSingleton.getInstance();

cosmosModelStoreSingleton.registerSequelizeModel('user', User);

console.log('cosmos-model-initializer.ts:1::', cosmosModelStoreSingleton);
export default cosmosModelStoreSingleton;

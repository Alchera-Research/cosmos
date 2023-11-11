import express from 'express';
import restfulAppsRouter from './restful-apps/restful-apps.router';
import CosmosInitializer from '../library/cosmos-initializer.lib';
import cosmosModelInitializer from './restful-apps/cosmos-model-initializer';

const app = express();
const PORT = process.env.PORT || 4000;

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

CosmosInitializer.registerCosmosModelStore(cosmosModelInitializer);
CosmosInitializer.registerExpressApp(app);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});

app.use(restfulAppsRouter);

export default app;

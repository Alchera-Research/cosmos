import express from 'express';
import restfulAppsRouter from './restful-apps/restful-apps.router';

const app = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});

app.use(restfulAppsRouter);

export default app;


# Cosmos Request Flow

```
request start
|
|---> cosmos-middleware (request)
|
|---> your.router (extends CosmosRouter)
|
|---> your.controller (extends CosmosController)
|
|---> cosmos-middleware (response)
|---> cosmos-middleware (error)
|
|---> request end
|---> response end
|---> error end
|---> cosmos-logging moudle work asynchronously
```

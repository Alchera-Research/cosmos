# Cosmos

The Framework that makes Back-End and MLOps Development Easier, Faster

## Notice

This repository is very early stage of development.  
We do not recommend to use this repository for production level until we release 1.0 version.

## Docs

- [Trivia](./docs/TRIVIA.md)
- [Contribution Guide](./docs/CONTRIBUTION-GUIDE.md)
- [COMMIT-CONVENTION.md](docs/COMMIT-CONVENTION.md)
- TBD - FILE-NAMING CONVENTION

<br> <br> <br> <br>

# QuickStart

## Router Pattern Rules

ID parameter should be `${layerName}Id`

if your layer name is `/users` then parameter ID should be `:usersId`

### Example

```typescript

rotuer.route('/users')
  .get('getUsers')
  .post('createUsers');

rotuer.route('/users/:usersId')
  .get('getUsers')
  .put('updateUsers')
  .delete('deleteUsers');
```

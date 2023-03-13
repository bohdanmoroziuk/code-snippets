# Routing

## Styleguide

- Route/page naming convention:

  | Path            | Route name   | Page name      | What it does               |
  |-----------------|--------------|----------------|----------------------------|
  | /users          | users-index  | UsersIndex     | List all the users         |
  | /users/create   | users-create | UsersCreate    | Form to create the user    |
  | /users/:id      | users-show   | UsersShow      | Display the user's details |
  | /users/:id/edit | users-edit   | UsersEdit      | Form to edit the user      |

- Prefer to use the route name instead of the path for programmatic navigation:

  ```typescript
  router.push({ name: 'users-index' });
  ```

## Resources

- [Vue Router — The Missing Manual](https://blog.webf.zone/vue-router-the-missing-manual-ce51c21430b0)
- [Implementing a Simple Middleware with Vue Router](https://markus.oberlehner.net/blog/implementing-a-simple-middleware-with-vue-router/)

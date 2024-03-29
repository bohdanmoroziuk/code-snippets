# State Management

## Managing application state

1. Share state between components by lifting it up to the lowest common ancestor;
2. Use an external **Stateful Service** and allow components to consume state
directly;
3. Use **Composition API** to create reusable composables and external reactive
state to allow components to consume state directly;
4. Use **State Provider** pattern to provide state to the whole application or
only specific component tree;
5. Use state management library like **Vuex** or **Pinia**.

## Stores

- [useLoadingStore](./stores/loading.md)

## Resources

- [Should I Store This Data in Vuex – When Should I use Vuex?](https://markus.oberlehner.net/blog/should-i-store-this-data-in-vuex/)
- [Application State Management with Vue 3](https://markus.oberlehner.net/blog/application-state-management-with-vue-3/#use-the-swr-cache-pattern)

# Container/Presenter pattern

> Always separate the logic from the presentational component

The Container/Presenter pattern is a design pattern that separates a
component’s concerns into two distinct parts: the Container and the Presenter.
It can help to enforce the separation of concerns in your code and make it
easier to reason about and maintain.

In general, the container (so-called smart component) should handle:

- business logic/operations on data (CRUD operations)
- getting the initial set of data
- pass data to dumb/presentational component

On another hand component (so-called dumb/presentational component) should:

- display the data/present the content visually
- emit any change request

In Vue development, Container/Presenter pattern used to separate the concerns
of data management and UI presentation.

The benefits of using the Container/Presenter pattern are that it can make your
code more modular and easier to test. By separating data management from UI
presentation, you can create smaller and more focused components that are
easier to reason about.

The other major benefits inside that pattern is that it make all of your
presentation components reusable in multiple context because there are not
attached to a specific datasource.

## Resources 

- [Container Components in Vue.js: Advanced Component Composition](https://markus.oberlehner.net/blog/advanced-vue-component-composition-with-container-components/)
- [How this pattern made me write reusable Vue components with little effort](https://dberri.com/container-presentational-pattern-in-vue/)
- [Introduction to presentational/container architecture in Vuejs](https://ludwig-leplan.medium.com/introduction-to-presentational-container-architecture-in-vuejs-698114d22c58)
- [Best Practices of React Container/Presenter Pattern: Only Pros Know](https://itnext.io/best-practices-of-react-container-presenter-pattern-only-pros-know-33f2095647fa)
- [Containers vs Components in Angular](https://blog.bitsrc.io/is-it-still-performance-perspective-or-just-good-practice-containers-vs-components-in-angular-2b459cd7cf30)
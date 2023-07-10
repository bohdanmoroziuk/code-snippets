# Clean Architecture in Vue.js

## Project structure

See an example of a [project](https://github.com/yuzumi/booky) that implements
the Clean Architecture approach.

```txt
booky/
├── src/
│   ├── modules/
│   │   ├── bookmarks/
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── Bookmark.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── repositories/
│   │   │   │       ├── BookmarkRepository.ts
│   │   │   │       └── index.ts
│   │   │   ├── infrastructure/
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── HttpBookmarkRepository.ts
│   │   │   │   │   └── index.ts
│   │   │   ├── application/
│   │   │   │   └── services/
│   │   │   │       ├── BookmarkService.ts
│   │   │   │       └── index.ts
│   │   │   ├── presentation/
│   │   │   │   ├── components/
│   │   │   │   │   ├── BookmarkForm.vue
│   │   │   │   │   ├── BookmarkList.vue
│   │   │   │   │   ├── BookmarkListItem.vue
│   │   │   │   │   └── index.ts
│   │   │   │   ├── containers/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── useGetBookmarksController.ts
│   │   │   │   │   ├── useGetBookmarkByIdController.ts
│   │   │   │   │   ├── useUpdateBookmarkController.ts
│   │   │   │   │   ├── useDeleteBookmarkController.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Bookmarks.vue
│   │   │   │   │   ├── BookmarkUpdate.vue
│   │   │   │   │   └── BookmarkCreate.vue
│   │   │   │   ├── stores/
│   │   │   │   │   ├── useBookmarksStore.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── routes.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── App.vue
│   └── main.ts
└── test/
    ├── unit
    └── e2e
```

## Into

Clean architecture is a design pattern that aims to separate application
logic from user interface or external services. It does that by defining
layers in a circle, in which each layer can only interact with other layers
towards the center of the circle.

In Vue terms, the layers would be (from outer to inner) **Components + Pages + Controllers + Stores -> Services -> Entities <- Repositories**.

## Domain

The Domain layer contains entities which define the basic data that our
application will use.
The Domain is an abstract view of the world — containing only the facts
relevant to the business.

### Entities

This is a class or type definition that defines the data and domain
restrictions of objects in our application.

---

- [Using TypeScript to map out your business domain](https://medium.com/@hayavuk/using-typescript-to-map-out-your-business-domain-69af4a8d109b)

### Repositories interfaces

This is an interface that defines all use cases and operations for an entity.

## Infrastructure

The Infrastructure layer contains the data access logic.

### Repositories

This is an implementation of the repository interface from the Domain level.

## Application

The Application layer contains all the logic and operations applied to the
entities.

### Services

From a technical perspective, it can be anything: class, function, a cluster
of functions, and an object with methods. The only rule: keep it away from
“details”: frameworks, stores, UI, etc. The only dependency Service should
have are Entities or other Services.
From a conceptual point of view, the goal of services is to perform required
business operations on Entities.
There could be one service for each entity, for example, a BookmarkService
would have all the logic for interacting with the Bookmark entity, like
fetching, creating, editing, deleting.
If you are familiar with the Repository-Service pattern, which is quite popular
in the backend world, you may find a lot of similarities.

---

- [Laravel Architecture Design: Service Repository Pattern Implementation](https://medium.com/@mianhaseeb41/laravel-architecture-design-service-repository-pattern-implementation-4f663281f5f7)
- [Decoding Async/Await in TypeScript: An Adventure in Refactoring with Decoupling and Domain-Driven Design](https://levelup.gitconnected.com/decoding-async-await-in-typescript-an-adventure-in-refactoring-with-decoupling-and-domain-driven-77b252c2c869)

## Presentation

The Presentation layer contains the user interface, the stores and controllers,
this is mostly the Vue part of the app.

### Stores

This is where your data is stored.

### Controllers

The controller is an element that is called from the page or container
(smart component), executes tasks through a store and returns the result to the
page or container.
There should be one controller for each operation.

### Components

This is the Vue component we know.

## Sources

- [Clean Architecture: Typescript and React](https://paulallies.medium.com/clean-architecture-typescript-and-react-8e509098abfe)
- [Clean Architecture: TypeScript and React](https://codefoundation.co.za/clean-architecture-typescript-and-react)

---

- [Implementing a Clean Architecture Modular Application in Nuxt/Vue Typescript Part 1: Domain Layer](https://dirodriguezm.gitlab.io/nuxt-clean-architecture.html)
- [Implementing a Clean Architecture Modular Application in Nuxt/Vue Typescript Part 2: Services](https://dirodriguezm.gitlab.io/nuxt-clean-architecture-part2.html)
- [Implementing a Clean Architecture Modular Application in Nuxt/Vue Typescript Part 3: Vuex Store](https://dirodriguezm.gitlab.io/nuxt-clean-architecture-part3.html)
- [Implementing a Clean Architecture Modular Application in Nuxt/Vue Typescript Part 4: UI Components](https://dirodriguezm.gitlab.io/nuxt-clean-architecture-part4.html)

---

- [Building an Enterprise Application with Vue](https://javascript.plainenglish.io/building-vue-enterprise-application-part-0-overture-6d41bea14236)
- [Building Vue Enterprise Application: Part 1. Entities](https://levelup.gitconnected.com/building-vue-enterprise-application-part-1-entities-808077f3d2e7)
- [Building Vue Enterprise Application: Part 2. Services](https://javascript.plainenglish.io/building-vue-enterprise-application-part-2-services-f7ec400190e7)
- [Building Vue Enterprise Application: Part 3. The Store](https://itnext.io/building-vue-enterprise-application-part-3-the-store-dbda0e4bb117)
- [Building Vue Enterprise Application: Part 4. UI components](https://itnext.io/building-vue-enterprise-application-part-4-ui-components-21a45b3067a4)

---

- [Flutter Project Structure: Feature-first or Layer-first?](https://codewithandrea.com/articles/flutter-project-structure/)
- [Flutter App Architecture with Riverpod: An Introduction](https://codewithandrea.com/articles/flutter-app-architecture-riverpod-introduction/)
- [Flutter App Architecture: The Repository Pattern](https://codewithandrea.com/articles/flutter-repository-pattern/)
- [Flutter App Architecture: The Domain Model](https://codewithandrea.com/articles/flutter-app-architecture-domain-model/)
- [Flutter App Architecture: The Application Layer](https://codewithandrea.com/articles/flutter-app-architecture-application-layer/)
- [Flutter App Architecture: The Presentation Layer](https://codewithandrea.com/articles/flutter-presentation-layer/)

---

- [How Clean Architecture enables McDonald’s to optimize market-specific needs and user experience](https://medium.com/mcdonalds-technical-blog/how-clean-architecture-enables-mcdonalds-to-optimize-market-specific-needs-and-user-experience-b31b8a0ad4f9)
- [A Practical Approach to Clean Architecture in C# .NET](https://maherz.medium.com/a-practical-approach-to-clean-architecture-in-c-net-13fe27ea23b1)
- [Laravel Domain Driven Design: A Comprehensive Guide](https://medium.com/@mianhaseeb41/laravel-domain-driven-design-a-comprehensive-guide-c8b12c7ad79a)


## Examples

- [vue-shopping-clean-architecture](https://github.com/thanhchungbtc/vue-shopping-clean-architecture)
- [nuxt-clean-architecture](https://gitlab.com/dirodriguezm/nuxt-clean-architecture)
- [hexagonal-architecture-frontend](https://github.com/juanm4/hexagonal-architecture-frontend)
- [vue-clean-architecture](https://github.com/smotastic/vue-clean-architecture)
- [vue-vuex-ts](https://github.com/soloschenko-grigoriy/vue-vuex-ts)
- [clean-typescript-react](https://github.com/nanosoftonline/clean-typescript-react)
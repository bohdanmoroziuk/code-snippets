# Domain-driven design

## Structure

```txt
src/
├── api
├── assets
├── components
├── composables
├── helpers
├── directives
├── plugins
├── layouts
├── i18n
├── modules
├── router
├── static
├── stores
├── services
├── pages
└── App.vue
test/
├── unit
└── e2e
```

### modules

There are two kinds of modules:

1. Core Modules: contribute to the app’s core functionalities such as
store, router, translations, etc
2. Feature Modules: add support to the different features the app provides
to users, e.g. product list and details, checkout, user settings, etc

```txt
modules/
└── orders/
  ├── api
  ├── components
  ├── composables
  ├── helpers
  ├── router
  ├── static
  ├── stores
  ├── services
  ├── pages
  └── index.ts
```

## Resources

- [Group By Domain](https://markus.oberlehner.net/blog/vue-project-directory-structure-keep-it-flat-or-group-by-domain/#group-by-domain)
- [How to structure my Vue.js project](https://itnext.io/how-to-structure-my-vue-js-project-e4468db005ac)
- [How to structure your Vue project for the long term](https://medium.com/glovo-engineering/how-to-structure-your-vue-project-for-the-long-term-657817a2a002)
- [Separating a Vue project into modules](https://xon5.medium.com/splitting-a-vue-pwa-into-modules-d2afa2a0f99c)
- [Frontend Architectures: “Simple Modular” Approach](https://javascript.plainenglish.io/frontend-architectures-simple-modular-approach-7f3b3efe0ecd)

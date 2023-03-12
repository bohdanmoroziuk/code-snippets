# Flat project structure

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
├── router
├── static
├── stores
├── services
├── server
├── pages
└── App.vue
test/
├── unit
└── e2e
```

### api

The api folder holds all API call functions.

```txt
api/
└── auth.ts
```

### assets

The assets folder holds your asset files like styles, fonts and images.

```txt
assets/
├── styles
├── fonts
├── images
└── videos
```

### components

The components folder holds all reusable components of the application.

```txt
components/
├── DataTable.vue
└── Loader.vue
```

### composables

```txt
composables/
├── modal.ts
└── list.ts
```

### helpers

As the name suggests, the helpers will hold helper functions that you would like to use in your application.

```txt
helpers/
└── date.ts
```

### directives

```txt
directives/
└── focus.ts
```

### plugins

In this folder you can create your plugins.

```txt
plugins/
├── env.ts
└── index.ts
```

### layouts

The layouts folder is used to hold the layouts of your application.

```txt
layouts/
├── variants/
│   ├── AuthLayout.vue
│   ├── EmptyLayout.vue
│   └── MainLayout.vue
└── AppLayout.vue
```

### services

This folder is needed to store your services.

```txt
services/
├── notification.ts
├── storage.ts
├── dialog.ts
└── http-client.ts
```

### static

It can be used to store some dummy data.

### router

This folder contains all router configurations and routes.
You can store your navigation guards inside this folder.

```txt
router/
├── middleware/
│   ├── isAuthenticated.ts
├── routes.ts
├── helpers.ts
└── index.ts
```

### stores

This is vuex store directory where you can save all vuex related files.

```txt
store/
├── modules/
│   ├── ui.ts
│   └── index.ts
├── plugins/
│   ├── logger.ts
│   ├── persisted-state.ts
│   └── index.ts
└── index.ts
```

### pages

This is where we store all entry points for application routes.

```txt
pages/
├── Home.vue
└── NotFound.vue
```

### server

### test/unit

Contains unit test related files.

### test/e2e

Contains e2e test related files.

---

## Resources

- [How To Structure Folders In Your Vue Application](https://simeonnortey.medium.com/how-to-structure-folders-in-your-vue-application-ea3934d56380)
- [Structuring Vue components for reuse](https://mattlaw.dev/blog/structuring-vue-components-for-reuse/)
- [Frontend Architectures: “Classic” Approach (No Architecture)](https://javascript.plainenglish.io/frontend-architectures-classic-approach-no-architecture-d3c839e46403)
- [Flat File Tree](https://markus.oberlehner.net/blog/vue-project-directory-structure-keep-it-flat-or-group-by-domain/#flat-file-tree)
- [Flat File Tree with Base Directory](https://markus.oberlehner.net/blog/vue-project-directory-structure-keep-it-flat-or-group-by-domain/#flat-file-tree-with-base-directory)
- [vuejs-templates/webpack](https://vuejs-templates.github.io/webpack/)
- [vue-typescript](https://mmf-fe.github.io/vue-typescript/en/)

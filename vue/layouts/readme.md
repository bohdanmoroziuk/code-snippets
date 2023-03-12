# Layouts

I definitely like [Quasar](https://quasar.dev/)'s approach to handling multiple layouts in Vue.js apps.
The main idea here is to use parent routes as layouts. Each layout must include
a `router-view` component in its template to be able to nest child pages within itself.

## For example

We have one layout (`User`) and two pages (`UserFeed` and `UserProfile`):

```txt
src/
├── layouts/
│   └── User.vue
└── pages/
    ├── UserFeed.vue
    └── UserProfile.vue
```

We want to configure the website/app routes like this: `/user/feed` and `/user/profile`.
Since User layout wraps inner pages, they need an injection point. This is supplied by
the `router-view` component:

```html
<!-- src/layouts/User.vue -->

<template>
  ...
  <!-- this is where the Pages are injected -->
  <router-view /> 
  ...
</template>
```

```html
<!-- src/pages/UserFeed.vue or UserProfile.vue -->

<template>
  ...page content...
</template>
```

Our routes configuration (`src/router/routes.ts`) should look like this:

```typescript
export default [
  {
    path: '/user', // /user
    component: () => import('src/layouts/User.vue'),
    children: [
      {
        path: 'feed', // /user/feed
        component: () => import('src/pages/UserFeed.vue'),
      },
      {
        path: 'profile', // /user/profile
        component: () => import('src/pages/UserProfile.vue'),
      },
    ],
  },
];
```

Please note that we use [lazy loading](../techniques/lazy-loading-routes.md)
of layouts and pages (`() => import(<path>)`).

There are also other ways to handle layouts in your applications. Use the most
suitable one.

## Resources

- [Quasar: Routing with Layouts and Pages](https://quasar.dev/layout/routing-with-layouts-and-pages)
- [Vue tricks: smart layouts for VueJS](https://itnext.io/vue-tricks-smart-layouts-for-vuejs-5c61a472b69b)

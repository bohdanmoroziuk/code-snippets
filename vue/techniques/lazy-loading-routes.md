# Lazy loading routes

Always lazily load your route components.

## Helpers

```typescript
// src/router/helpers.ts

export const loadComponent = (
  (subdirectoryName: string) => (
    (componentName: string) => (
      () => import(/* webpackChunkName: "[request]" */ `src/${subdirectoryName}/${componentName}.vue`))));

export const loadLayout = loadComponent('layouts');

export const loadPage = loadComponent('pages');
```

## Usage

```typescript
// // src/router/routes.ts

import { RouteRecordRaw } from 'vue-router';

import { loadLayout, loadPage } from 'src/router/helpers';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: loadLayout('MainLayout'),
    children: [
      {
        path: '',
        name: 'home',
        component: loadPage('IndexPage'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: loadPage('ErrorNotFound'),
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {
      name: '404',
    },
  },
];

export default routes;
```

# Small project structure

```txt
src/
├── assets
├── styles
├── composables
├── components
├── directives
├── plugins
├── layouts
├── router
├── services
├── static
├── stores
├── pages
test/
```

## assets

This directory stores all asset files: fonts, icons, images, etc.

```txt
assets/
├── images
├── videos
└── fonts
```

## styles

```txt
styles/
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── themes/
│   ├── _dark.scss
│   └── _light.scss
├── utils/
│   └── _variables.scss
└── main.scss
```

## composables

```txt
composables/
├── modal.ts
└── list.ts
```

## components

```txt
components/
├── DataTable.vue
└── Loader.vue
```

## directives

```txt
directives/
└── focus.ts
```

## plugins

In this folder you can create your plugins.

```txt
plugins/
├── env.ts
└── index.ts
```

## layouts

In this directory, you can save application layouts.

```txt
layouts/
├── variants/
│   ├── AuthLayout.vue
│   ├── DefaultLayout.vue
│   └── MainLayout.vue
└── AppLayout.vue
```

## services

This folder is needed to store your services. For example, you can create and maintain
an API connection service, a localStorage manager service, and so on.

```txt
services/
├── notification.ts
├── storage.ts
├── dialog.ts
└── http-client.ts
```

## static

Normally you don't need this folder. It can be used to store some dummy data.

## router

```txt
router/
├── middleware/
│   ├── isAuthenticated.ts
├── routes.ts
├── utils.ts
└── index.ts
```

## stores

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

## pages

This is the second most important folder in our application.
This is where we store all entry points for application routes.

```txt
views/
├── Home.vue
└── NotFound.vue
```

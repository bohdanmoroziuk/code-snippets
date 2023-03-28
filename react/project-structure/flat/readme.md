# Flat project structure

## Structure

```txt
src/
├── __mocks__
├── __tests__
├── assets
├── config
├── constants
├── components
├── helpers
├── hooks
├── locales
├── pages
├── providers
├── services
├── store
├── types
├── index.tsx
└── App.tsx
```

### __mocks__

In `__mocks__` directory we should save our mocked, dummy and related data for our unit tests.

### __tests__

In `__tests__` directory we should write our unit tests.

### assets

In `assets` directory we should save our images, videos, icons and fonts. So we can separate this
directory to `images`, `videos`, `icons`, and `fonts`.

### config

In `config` directory we should place configuration files for 3rd party API’s and environmental
variables.

### constants

In `constants` directory we should save our constants variables, for example routing paths, project
related keys etc.

### components

In `components` directory we should save our mini sections or UI elements and use them everywhere in
project.

### helpers

In `helpers` directory we should write our helper functions for multiple using in project.

### hooks

In `hooks` directory we should write our custom hooks.

### locales

In `locales` directory we should save our translation files.

### pages

In `pages` directory we should create our website main pages.

### providers

In `providers` directory we should create our React Context API providers.

### services

In `services` directory we should write our API calls.

### store

In `store` directory we should save our redux related files.

### types

In `types` directory we should save our types and interfaces that are used in more than one place.

## Resources

- [Structure your React project like a pro](https://medium.com/@martik/structure-your-react-project-like-pro-cea90aaf82bc)
- [Structure Your React Project Like a Senior Developer](https://levelup.gitconnected.com/structure-your-react-project-like-a-senior-developer-6cf88b5d8d73)

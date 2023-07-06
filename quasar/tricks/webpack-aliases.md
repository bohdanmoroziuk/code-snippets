# Webpack Aliases

Adding Webpack aliases:

1. To add your own alias you should extend the webpack config
and merge it with the existing alias. Use the `path.resolve`
helper to resolve the path to your intended alias.

```javascript
// quasar.config.js
const path = require('path')

module.exports = function (ctx) {
  return {
    build: {
      extendWebpack (cfg, { isServer, isClient }) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias

          // Add your own alias like this
          investment-projects: path.resolve(__dirname, './src/modules/investment-projects'),
        }
      }
    }
  }
}
```

Equivalent with `chainWebpack()`:

```javascript
// quasar.config.js
const path = require('path')

module.exports = function (ctx) {
  return {
    build: {
      chainWebpack (chain, { isServer, isClient }) {
        chain.resolve.alias
          .set('investment-projects', path.resolve(__dirname, './src/modules/investment-projects'))
      }
    }
  }
}
```

2. The next step is to configure the `paths` option in the `tsconfig.json` file:

```json
{
  "extends": "@quasar/app-webpack/tsconfig-preset",
  "compilerOptions": {
    "baseUrl": ".",
    "allowJs": true,
    "paths": {
      "investment-projects/*": ["src/modules/investment-projects/*"],
    }
  }
}
```

3. Now you can use your alias like this:

```typescript
// somewhere in your app

import { InvestmentProjectList } from 'investment-projects/components';
```

## Resources

- [Webpack Aliases](https://quasar.dev/quasar-cli-webpack/handling-webpack/#webpack-aliases)

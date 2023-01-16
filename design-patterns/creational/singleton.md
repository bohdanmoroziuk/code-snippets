# Singleton

Violates the Single Responsibility Principle.

## Intent

**Singleton** is a creational design pattern that lets you ensure
that a class has only one instance, while providing a global
access point to this instance.

## Structure

![Singleton pattern structure](https://miro.medium.com/max/1400/1*Emru7-sr_AEKrIzgiLROAA.png)

1. The **Singleton** class declares the static method `getInstance`
that returns the same instance of its own class.
The Singleton’s constructor should be hidden from the client
code. Calling the `getInstance` method should be the only way
of getting the Singleton object.

## Applicability

- Use the Singleton pattern when a class in your program should
have just a single instance available to all clients; for example,
a single database object shared by different parts of the
program.
- Use the Singleton pattern when you need stricter control over
global variables.

## Implementation

1. Add a private static field to the class for storing the singleton
instance.
2. Declare a public static creation method for getting the singleton
instance.
3. Implement “lazy initialization” inside the static method.
4. Make the constructor of the class private.
5. Go over the client code and replace all direct calls to the singleton’s
constructor with calls to its static creation method.

The easiest way to implement a singleton in JavaScript is to use
an object literal:

```javascript
const httpClient = {
  get(url, config) {
    // send get request
  },
  post(url, config) {
    // send post request
  },
};
```

If you need to include private properties or methods, you can use the
Module pattern to create a singleton:

```javascript
const httpClient = (function () {
  // private method
  function sendRequest(url, config) {
    // send request
  }
  return {
    get(url, config) {
      return sendRequest(url, config);
    },
    post(url, config) {
      return sendRequest(url, config);
    },
  };
})();
```

If you are using ES6, you can represent a singleton using ES Modules
very easily:

```javascript
export default {
  get(url, config) {
    // send get request
  },
  post(url, config) {
    // send post request
  },
};
```

## Examples

- Example #1

```typescript
export class Config {
  private static instance: Config;

  private config: Record<string, unknown> = {}

  private constructor() {}

  static getInstance() {
    if (!Config.instance) {
      Config.instance = new Config();
    }

    return Config.instance;
  }

  get(key: string) {
    return this.config[key];
  }

  getOr(key: string, fallbackValue: unknown) {
    return this.config[key] ?? fallbackValue;
  }

  set(key: string, value: unknown) {
    this.config[key] = value;
  }
}

const config = Config.getInstance();

config.set('baseUrl', 'http://localhost:3000');

console.log(
  config.get('port'), // undefined
  config.getOr('port', 8080), // 8080
  config.get('baseUrl'), // http://localhost:3000
);
```

- Example #2

```typescript
export class Logger {
  private static instance: Logger;

  private constructor(
    private isEnabled: boolean,
  ) {}

  static getInstance(isEnabled = true): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(isEnabled);
    }

    return Logger.instance;
  }

  disable() {
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;
  }

  log(message: string) {
    if (this.isEnabled) {
      console.log(message);
    }
  }
}

const logger = Logger.getInstance();

logger.log('You can see this message'); // You can see this message

logger.disable();

logger.log('You cannot see this message'); // Nothing!
```

## Resources

- [Singleton](https://refactoring.guru/design-patterns/singleton)
- [Design Patterns: Singleton Pattern in TypeScript](https://levelup.gitconnected.com/design-patterns-singleton-pattern-in-typescript-e98ec08a9c14)
- [singleton pattern](https://basarat.gitbook.io/typescript/main-1/singleton)
- [typescript-design-patterns/patterns/singleton](https://github.com/AliN11/typescript-design-patterns/blob/main/patterns/singleton.ts)
- [TypeScript Singleton Pattern Example](https://www.javaguides.net/2019/10/typescript-singleton-pattern-example.html)
- [Singleton pattern in TypeScript](https://www.jmalvarez.dev/posts/singleton-typescript)
- [Singleton in TypeScript](https://www.devmaking.com/learn/design-patterns/singleton-pattern/typescript/)

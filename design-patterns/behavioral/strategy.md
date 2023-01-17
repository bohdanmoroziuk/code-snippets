# Strategy

## Intent

**Strategy** is a behavioral design pattern that lets you define a
family of algorithms, put each of them into a separate class,
and make their objects interchangeable.

## Structure

![Strategy pattern structure](https://www.researchgate.net/publication/322881297/figure/fig11/AS:703024402026499@1544625487563/Class-diagram-of-strategy-design-pattern.png)

1. The *Context* maintains a reference to one of the concrete
strategies and communicates with this object only via the
strategy interface.
2. The *Strategy* interface is common to all concrete strategies. It
declares a method the context uses to execute a strategy.
3. Concrete Strategies implement different variations of an algorithm
the context uses.
4. The context calls the execution method on the linked strategy
object each time it needs to run the algorithm. The context
doesn’t know what type of strategy it works with or how the
algorithm is executed.
5. The *Client* creates a specific strategy object and passes it to
the context. The context exposes a setter which lets clients
replace the strategy associated with the context at runtime.

## Applicability

- Use the Strategy pattern when you want to use different variants
of an algorithm within an object and be able to switch
from one algorithm to another during runtime.
- The Strategy pattern lets you indirectly alter the object’s
behavior at runtime by associating it with different sub-objects
which can perform specific sub-tasks in different ways.
- Use the Strategy when you have a lot of similar classes that
only differ in the way they execute some behavior.
- The Strategy pattern lets you extract the varying behavior into
a separate class hierarchy and combine the original classes
into one, thereby reducing duplicate code.
- Use the pattern to isolate the business logic of a class from
the implementation details of algorithms that may not be as
important in the context of that logic.
- The Strategy pattern lets you isolate the code, internal data,
and dependencies of various algorithms from the rest of the
code. Various clients get a simple interface to execute the
algorithms and switch them at runtime.
- Use the pattern when your class has a massive conditional
statement that switches between different variants of the
same algorithm.
- The Strategy pattern lets you do away with such a conditional
by extracting all algorithms into separate classes, all of which
implement the same interface. The original object delegates
execution to one of these objects, instead of implementing all
variants of the algorithm.

## Examples

### Authentication example

```typescript
interface Strategy {
  authenticate(args: any[]): boolean;
}

class TwitterStrategy implements Strategy {
  authenticate(args: any[]) {
    const [token] = args;
    if (token !== "tw123") {
      console.error("Twitter account authentication failed!");
      return false;
    }
    console.log("Twitter account authentication succeeded!");
    return true;
  }
}

class LocalStrategy implements Strategy {
  authenticate(args: any[]) {
    const [username, password] = args;
    if (username !== "bytefer" || password !== "666") {
      console.log("Incorrect username or password!");
      return false;
    }
    console.log("Account and password authentication succeeded!");
    return true;
  }
}

class Authenticator {
  strategies: Record<string, Strategy> = {};
  
  use(name: string, strategy: Strategy) {
    this.strategies[name] = strategy;
  }
  
  authenticate(name: string, ...args: any) {
    if (!this.strategies[name]) {
      console.error("Authentication policy has not been set!");
      return false;
    }
    return this.strategies[name].authenticate.apply(null, args);
  }
}

const auth = new Authenticator();

auth.use("twitter", new TwitterStrategy());
auth.use("local", new LocalStrategy());

function login(mode: string, ...args: any) {
  return auth.authenticate(mode, args);
}

login("twitter", "123");
login("local", "bytefer", "666");
```

### StorageSelector example

Dependencies

- [secure-ls](https://github.com/softvar/secure-ls)
- [StorageAdapter](https://github.com/yuzumi/code-snippets/blob/main/design-patterns/structural/adapter.md#securels-example)

```typescript
interface Selector<K, V> {
  selectFor(key: K): V;
}

type Env = 'development' | 'test' | 'production';

class StorageSelector implements Selector<Env, Storage> {
  private map: Record<Env, Storage>;

  constructor(map: Record<Env, Storage>) {
    this.map = map;
  }

  selectFor(key: Env): Storage {
    return this.map[key];
  }
}

const storageSelector = new StorageSelector({
  development: localStorage,
  test: localStorage,
  production: new StorageAdapter(new SecureLS()),
});

const storage = storageSelector.selectFor(process.env.NODE_ENV);
```

## Resources

- [Design Patterns: Strategy Pattern in TypeScript](https://javascript.plainenglish.io/design-patterns-strategy-pattern-in-typescript-54eda9b40f09)

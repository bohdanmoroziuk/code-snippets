# Maybe/Option

The Maybe monad, also known as the Option monad, is a monad that is used to
represent computations that may or may not have a value. It is typically used
to handle the possibility of null or undefined values in a functional and
composable way.

The Maybe monad is typically implemented as an object that has two subtypes:
`Just` and `Nothing`. The `Just` subtype holds a value, while the `Nothing`
subtype represents the absence of a value.

Here’s an example of the Maybe monad in TypeScript:

```typescript
const Nothing = Symbol('Nothing');

class Maybe<T> {
  constructor(
    private value: T | typeof Nothing,
  ) {}

  static just<T>(value: T): Maybe<T> {
    if (value === null || value === undefined) {
      return Maybe.nothing<T>();
    }

    return new Maybe<T>(value);
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe<T>(Nothing);
  }

  static from<T>(value: T): Maybe<T> {
    return Maybe.just<T>(value);
  }

  map<U>(f: (value: T) => U): Maybe<U> {
    if (this.value === Nothing) {
      return Maybe.nothing<U>();
    }

    return Maybe.just<U>(f(this.value));
  }

  match<U>({ just, nothing }: { just: (value: T) => U, nothing: () => U }) {
    if (this.value === Nothing) {
      return nothing();
    }

    return just(this.value);
  }

  chain<U>(f: (value: T) => Maybe<U>): Maybe<U> {
    if (this.value === Nothing) {
      return Maybe.nothing<U>();
    }

    return f(this.value);
  }

  getOrElse(defaultValue: T) {
    if (this.value === Nothing) {
      return defaultValue;
    }

    return this.value;
  }
}

const result = Maybe
  .from(5)
  .map((x) => x + 5)
  .chain((x) => Maybe.from(x + 3))
  .getOrElse(0);

console.log(result); // 13
```

## Third-party solutions

- [purify-ts/Maybe](https://gigobyte.github.io/purify/adts/Maybe)

## Resources

- [The Power of Maybe in TypeScript](https://medium.com/@travisWaithMair/the-power-of-maybe-in-typescript-c51d07bbe352)
- [Nest.JS | Monads -> Maybe](https://nodeteam.medium.com/nest-js-monads-maybe-1078c314431b)
- [Nest.JS | Monads -> Maybe -> Make](https://nodeteam.medium.com/nest-js-monads-maybe-make-2e4cec94ccf8)
- [How to write a more declarative TypeScript Code? Maybe monad implementation](https://kkalamarski.me/how-to-write-a-more-declarative-typescript-code-maybe-monad-implementation)
- [Fun JavaScript: Safely dealing with undefined/null values using functional programming](https://itnext.io/fun-javascript-safely-dealing-with-undefined-null-values-using-functional-programming-39dcbc61eb0c)
- [Maybe (aka Option) Monad in JavaScript(video)](https://functionalprogramming.medium.com/from-null-object-design-pattern-to-maybe-functor-in-javascript-a398f947e3df)
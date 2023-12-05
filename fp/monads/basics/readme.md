# Introduction to Monads

A monad is a design pattern and a mathematical structure that is used to model
computations in a functional programming paradigm. It is a way of composing
computations in a way that separates the concerns of handling the flow of data
and the logic of the computation.

A monad is a type of container that wraps a value and provides a set of methods,
such as map, flatMap, chain, etc. that allow you to transform the value and
chain multiple computations together. The methods provided by a monad make it
easy to reason about the flow of data and the logic of the computation, and make
it possible to write code that is easy to understand and maintain.

The most common use of monads is to handle side-effects, such as handling
errors, I/O, state, and non-determinism. Monads are a way of abstracting the
handling of side-effects away from the core logic of the program, making it
easier to test and reason about the program.

Some examples of monads are Maybe Monad, Either Monad, IO Monad, List Monad,
State Monad, Identity Monad, Reader Monad, and Writer Monad. Each one of these
monads have a specific purpose, for example, Maybe Monad is used for handling
nullable values, Either Monad is used for handling errors, IO Monad is used for
handling I/O operations, State Monad is used for handling state, and so on.

Here’s an example of a simple implementation of a Maybe monad in TypeScript:

```typescript
class Maybe<T> {
  constructor(private value: T) {}

  private get isNil() {
    return this.value === null || this.value === undefined;
  }

  static of<T>(value: T) {
    return new Maybe<T>(value);
  }

  map<U>(fn: (value: T) => U) {
    return this.isNil
      ? Maybe.of(fn(this.value))
      : Maybe.of(null);
  }

  bind<U>(fn: (value: T) => Maybe<U>) {
    return this.isNil
      ? fn(this.value)
      : Maybe.of(null);
  }

  getOrElse(defaultValue: T) {
    return this.isNil
      ? defaultValue
      : this.value;
  }
}

const result = Maybe.of(5)
  .map(x => x * 2)
  .map(x => x + 1);

console.log(result.getOrElse(0)); // 11
```

## Resources

- [Monads are everywhere... Maybe that's bad?](https://www.youtube.com/watch?v=nGhoZzihbHY&list=WL&index=47)
- [Functional programming in JavaScript 101: Monads](https://javascript.plainenglish.io/functional-programming-in-javascript-101-monads-e254934430c8)
- [Nest.JS | Monads](https://nodeteam.medium.com/nest-js-monads-e098176184aa)
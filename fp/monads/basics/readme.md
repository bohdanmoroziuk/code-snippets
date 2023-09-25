# Introduction to Monads

A monad is a design pattern that allows for the composition of functions that
use and return a specific type of value, called the “wrapped” value. Monads
provide a way to abstract away the handling of certain types of computations,
such as dealing with null or undefined values, exceptions, or asynchrony.

A common example of a monad is the `Maybe` monad, which can be
used to handle the possibility of null or undefined values. Here’s an example
of a simple implementation of a Maybe monad in TypeScript:

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

There are many other monads available such as Either, IO, Task, List, etc.
Monads can be used to solve a variety of problems, such as handling side
effects, error handling, and asynchronous programming, and provide a powerful
tool for functional composition and code reuse.

## Resources

- [Monads are everywhere... Maybe that's bad?](https://www.youtube.com/watch?v=nGhoZzihbHY&list=WL&index=47)
- [Functional programming in JavaScript 101: Monads](https://javascript.plainenglish.io/functional-programming-in-javascript-101-monads-e254934430c8)
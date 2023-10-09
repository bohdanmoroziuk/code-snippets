# Identity

## Introduction

The Identity monad is a simple monad that wraps a value without applying any
additional behavior or computation. It is often used as a building block for
more complex monads.

## Implementation

```typescript
class Identity<T> {
  constructor(
    private value: T,
  ) {}

  // unit, return
  static of<T>(value: T) {
    return new Identity<T>(value);
  }

  map<U>(f: (value: T) => U) {
    return new Identity(f(this.value));
  }

  // bind, flatMap
  chain<U>(f: (value: T) => Identity<U>) {
    return f(this.value);
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return `Identity(${this.value})`;
  }
}

const f = (value: Record<string, unknown>) => Identity.of(Object.assign(value, { foo: 'bar' }));

const g = (value: Record<string, unknown>) => Object.assign(value, { bar: 'foo' });

const h = (value: Record<string, unknown>) => JSON.stringify(value);

const result = Identity.of({ foo: 'foo' })
  .chain(f)
  .map(g)
  .map(h)
  .valueOf(); 

console.log(result); // Logs: "{"foo":"bar","bar":"foo"}"
```

## Sources

- [Nest.JS | Monads -> Identity](https://nodeteam.medium.com/nest-js-monads-identity-d2e1a0a48740)
- [Identity Monad](https://riptutorial.com/javascript/example/19182/identity-monad)
- [Const and Identity Monads](https://javascript.plainenglish.io/const-and-identity-monads-6cbeca88fc85)
- [Crocks - Identity](https://crocks.dev/docs/crocks/Identity.html)
- [Operating Within a Context: Working with Monads in my JavaScript](https://www.linkedin.com/pulse/operating-within-context-dealing-monads-my-javascript-kevin-greene/)
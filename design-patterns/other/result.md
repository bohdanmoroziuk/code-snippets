# Result Pattern

## Introduction

The Result pattern is a powerful concept in TypeScript that greatly enhances
error handling and code organization. By effectively managing success and
failure scenarios, the Result pattern provides a clear and structured approach
to handling operations that can yield different outcomes.

In the Result pattern, the Result type acts as a container that represents the
result of an operation. It typically consists of two possible states: success
and error. When an operation succeeds, the Result object holds the successful
result value. On the other hand, if an operation encounters an error, the
Result object captures the error details.

## Benefits

Using the Result pattern in TypeScript offers several benefits for software
development:

- **Explicit Error Handling**: The Result pattern enforces explicit error
handling by requiring developers to acknowledge and handle potential errors. 
- **Clear Separation of Success and Error Paths**: By differentiating between
success and error outcomes, the Result pattern promotes code clarity and
maintainability.
- **Improved Error Reporting**: The Result pattern allows for better error
reporting by capturing and propagating error details throughout the call stack.
- **Consistent Error Handling Strategy**: With the Result pattern, you can
establish a consistent error handling strategy across your codebase.

## Use Cases

Here are some examples and use cases where the Result Pattern proves to be
beneficial:

- **Handling API Requests**: When making API requests, the Result Pattern
allows you to handle success and error responses in a structured manner. 
- **Data Validation and Parsing**: When validating user input or parsing data
from external sources, the Result Pattern can help manage validation errors
and parsing failures effectively.
- **Database Operations**: When performing database operations, the Result
Pattern can assist in handling success and failure scenarios. 
- **File Operations**: File operations, such as reading or writing files, can
also benefit from the Result Pattern.
- **Asynchronous Operations**: The Result Pattern is especially useful when
dealing with asynchronous operations, such as Promises or async/await
functions.

## Implementation

### The Class-Based Result

```typescript
type Result<T, E = Error> =
  | Ok<T, E>
  | Err<T, E>;

type Matchers<O, T, E = Error> = {
  ok: (value: T) => O,
  err: (error: E) => O,
}

class Ok<T, E = Error> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return false;
  }

  getValue() {
    return this.value;
  }

  map<O>(f: (value: T) => O): Result<O, E> {
    try {
      return new Ok<O, E>(f(this.value));
    } catch (error) {
      return new Err<O, E>(error as E);
    }
  }

  match<O>({ ok }: Matchers<O, T, E>) {
    return ok(this.value);
  }
}

class Err<T, E = Error> {
  private error: E;

  constructor(error: E) {
    this.error = error;
  }

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return true;
  }

  getErr() {
    return this.error;
  }

  map<O>(_: (value: T) => O): Result<O, E> {
    return new Err<O, E>(this.error);
  }

  match<O>({ err }: Matchers<O, T, E>) {
    return err(this.error);
  }
}

const ok = <T, E = Error>(value: T) => new Ok<T, E>(value);

const err = <T, E = Error>(error: E) => new Err<T, E>(error);

const parseUnsignedInteger = (input: string): Result<number, Error> => {
  const number = Number.parseInt(input);

  if (Number.isNaN(number)) {
    return err(new Error('Invalid input'));
  }

  if (number < 0) {
    return err(new Error('Number is negative'));
  }

  return ok(number);
};

const port = parseUnsignedInteger('3000');

port
  .match({
    ok(value: number) {
      console.log('Port:', value);
    },
    err(error: Error) {
      console.warn('Error:', error.message);
    }
  });

// Output:
// Port: 3000
```

### The Function-Based Result

```typescript
import { pipe } from 'lodash/fp';

interface Ok<T> {
  ok: true;
  value: T;
}

interface Err<E = Error> {
  ok: false;
  error: E;
}

type Result<T, E = Error> =
  | Ok<T>
  | Err<E>;

interface Matchers<T, E, R1, R2> {
  ok: (value: T) => R1,
  err: (error: E) => R2,
}

const ok = <T>(value: T): Ok<T> => ({
  ok: true,
  value,
});

const err = <E = Error>(error: E): Err<E> => ({
  ok: false,
  error,
});

const isOk = <T, E>(result: Result<T, E>): result is Ok<T> => result.ok;

const isErr = <T, E>(result: Result<T, E>): result is Err<E> => !result.ok;

const wrap = <T, E, R>(f: (value: T) => R) => (result: Result<T, E>): Result<R, E> => {
  try {
    return isOk(result)
      ? ok(f(result.value))
      : result
  } catch (error) {
    return err(error as E);
  }
};

const match = <T, E, R1, R2>(matchers: Matchers<T, E, R1, R2>) => (result: Result<T, E>) => (
  isOk(result)
    ? matchers.ok(result.value)
    : matchers.err(result.error)
);

const encase = <T, E, A extends unknown[]>(f: (...args: A) => T) => (...args: A): Result<T, E> => {
  try {
    return ok(f(...args));
  } catch (error) {
    return err(error as E);
  }
};

interface User {
  name: string;
}

const parseJSON = encase<User, Error, [text: string]>(JSON.parse);

const userString = JSON.stringify({ name: 'John Doe' });

const getName = (user: User) => user.name;

const printUserName = (name: string) => {
  console.log(name);
};

const printErrorMessage = (error: Error) => {
  console.log(error.message);
};

pipe(
  parseJSON,
  wrap(getName),
  match({
    ok: printUserName,
    err: printErrorMessage,
  }),
)(userString);

// Output:
// John Doe
```

## Best Practices and Tips

Here are some key recommendations:

- **Use Meaningful Success and Error Types**
- **Handle Errors Explicitly**: Avoid simply returning a Result object without
handling the error case in the calling code. By explicitly handling errors, you
can provide appropriate error messages, perform error recovery, or take other
necessary actions.
- **Leverage TypeScript’s Type System**: Utilize type annotations to ensure
that functions that return a Result type are properly handled in the calling
code.
- **Separate Error Handling from Business Logic**: Separate error handling
concerns into dedicated error handling functions or modules.
- **Document Error Cases and Return Types**: This helps other developers
understand the expected behavior and handle the Result objects correctly.
- **Consider Using Libraries**: These libraries often provide additional
features, utilities, and conventions that can streamline your implementation
and improve productivity.

## Libraries

- [neverthrow](https://github.com/supermacro/neverthrow)
- [ts-results](https://github.com/vultix/ts-results)
- [result](https://github.com/badrap/result)
- [ts-belt](https://github.com/mobily/ts-belt)
- [rustic](https://github.com/franeklubi/rustic)
- [pratica](https://github.com/rametta/pratica)
- [oxide.ts](https://github.com/traverse1984/oxide.ts)
- [true-myth](https://true-myth.js.org/index.html)

## Resources

- [Type-Safe Error Handling In TypeScript](https://www.codementor.io/@supermacro/type-safe-error-handling-in-typescript-1bp40rs502)
- [A declarative approach to error handling in Typescript](https://kkalamarski.me/a-declarative-approach-to-error-handling-in-typescript)
- [Railroad Programming in TypeScript](https://itnext.io/railroad-programming-in-typescript-21d69f486f6e)
- [Simple Typescript Result Monad](https://thingsthatkeepmeupatnight.dev/posts/simple-typescript-result-monad/)
- [Result type in TypeScript](https://ctidd.com/2018/typescript-result-type)
- [Flexible Error Handling w/ the Result Class | Enterprise Node.js + TypeScript](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/)
- [TypeScript/Implement Rust-style Result](https://www.huy.rocks/everyday/02-14-2022-typescript-implement-rust-style-result)
- [Error handling in Typescript](https://harfangk.dev/en/posts/2023-06-11-error-handling-in-typescript.html)
- [Rust-like error handling in TypeScript](https://spaccatrosi.co.uk/blog/rust-like-typescript-error-handling/)
- [Mimicing Rust's Result type in typescript](https://dev.to/duunitori/mimicing-rust-s-result-type-in-typescript-3pn1)
- [Using Results in TypeScript](https://imhoff.blog/posts/using-results-in-typescript)
- [Cleaner Exception Handling in JavaScript](https://paulallies.medium.com/functional-exception-handling-in-javascript-with-the-either-monad-3fb596c73912)
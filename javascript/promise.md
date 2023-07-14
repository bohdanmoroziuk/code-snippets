# Promise

## Wait for a specific amount of time in milliseconds

```typescript
const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));
```

## Handle an async function efficiently

```typescript
type Success<T> = [null, T];

type Failure<E> = [E, undefined];

const to = <T = unknown, E = Error>(promise: Promise<T>): Promise<Success<T> | Failure<E>> => (
  promise
    .then<Success<T>>((data: T) => [null, data])
    .catch<Failure<E>>((error: E) => [error, undefined])
)
```

## Check whether a value is a promise

```typescript
const isPromise = (value: any): value is Promise<any> =>
  !!value &&
  (typeof value === 'object' || typeof value === 'function') && 
  typeof value?.then === 'function';
```

## Resources

- [How to write async await without try-catch blocks in Javascript](https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/)
- [Stop Using try-catch to Catch Async/Await Exceptions](https://javascript.plainenglish.io/stop-using-try-catch-to-catch-async-await-exceptions-6e0215ace654)
# Promise

- Wait for a specific amount of time in milliseconds

```typescript
const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));
```

- Handle an async function efficiently

```typescript
type Success<T> = [null, T];

type Failure<E> = [E, null];

const run = async <T, E = Error>(fn: () => Promise<T>): Promise<Success<T> | Failure<E>> => {
  try {
    const result = await fn();

    return [null, result];
  } catch (error) {
    return [error, null];
  }
};
```

- Check whether a value is a promise

```typescript
const isPromise = (value: any): value is Promise<any> =>
  !!value &&
  (typeof value === 'object' || typeof value === 'function') && 
  typeof value?.then === 'function';
```

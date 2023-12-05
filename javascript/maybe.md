# Maybe

```typescript
type Nothing = null | undefined;

type Something<T> = NonNullable<T>;

const isNothing = <T>(value: T | Nothing): value is Nothing => {
  return value === null || value === undefined;
}

const isSomething = <T>(value: T | Nothing): value is Something<T> => {
  return !isNothing(value);
};

class NothingError extends Error {}

function assertSomething<T>(value: T | Nothing, message: string): asserts value is Something<T> {
  if (isNothing(value)) {
    throw new NothingError(message);
  }
};

interface User {
  greet: () => string;
}

const user: User = {
  greet: () => 'Hi!',
};

const test = (user?: User | Nothing) => {
  assertSomething<User>(user, 'User is undefined');

  console.log(user.greet());
}

test(user); // Logs: 'Hi!'
```

## Sources

- [TypeScript: isNullish, nonNullish and assertNonNullish](https://itnext.io/typescript-isnullish-nonnullish-and-assertnonnullish-557deb6e8b17)
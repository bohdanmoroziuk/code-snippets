# Type Guards

```typescript
interface User {
  name: string;
  age: number;
}

const isUser = (value: unknown): value is User => {
  return (
    typeof value === 'object' && value != null &&
    typeof Reflect.get(value, 'name') === 'string' &&
    typeof Reflect.get(value, 'age') === 'number'
  );
};
```

```typescript
const is = <
  Input,
  Output extends Input,
  Args extends unknown[],
>(f: (value: Input, ...args: Args) => Output | undefined) => {
  return (value: Input, ...args: Args): value is Output => {
    return f(value, ...args) !== undefined;
  };
};

// const isNumber: (value: unknown) => value is number
const isNumber = is((value: unknown) => (typeof value === 'number' ? value : undefined));
```

## Resources

- [TypeScript Type Guards in 6 Minutes](https://levelup.gitconnected.com/typescript-type-guards-in-6-minutes-9a9bab7fbe78)
- [Stricter and Safer Type Guards in TypeScript](https://safareli.medium.com/stricter-and-safer-type-guards-in-typescript-4cc0736970c6)

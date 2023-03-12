# Assert/Invariant

## Implementation

```typescript
const isProduction = process.env.NODE_ENV === 'production';

export default function invariant(
  condition: unknown,
  message = 'Invariant failed',
  skipInProduction = false,
): asserts condition {
  if (condition) return;

  if (skipInProduction && isProduction) return;

  throw new Error(message);
}

```

## Example

```typescript
const id = 1;

invariant(typeof id === 'string', 'Expected a string', true);

// Uncaught Error: Expected a string
```

## Resources

- [Invariant - a helpful JavaScript pattern](https://www.strictmode.io/articles/invariant)
- [tiny-invariant](https://github.com/alexreardon/tiny-invariant)
- [invariant](https://github.com/zertosh/invariant)

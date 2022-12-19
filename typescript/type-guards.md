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

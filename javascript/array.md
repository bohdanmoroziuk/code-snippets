# Array

- Shuffle an array of any type

```typescript
const shuffle = <T>(list: T[]) => list.slice().sort(() => Math.random() - 0.5);
```

- Get a random item of an array

```typescript
const sample = <T>(list: T[]): T => list[(Math.random() * list.length) | 0];
```

- Remove all duplicate values in an array

```typescript
const unique = (list: unknown[]) => [...new Set(list)];
```

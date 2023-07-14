# Advanced types

## Maybe

```typescript
type Maybe<T> = T | null | undefined;
```

## Nullable

```typescript
type Nullable<T extends object> = {
  [K in keyof T]: T[K] | null;
}
```

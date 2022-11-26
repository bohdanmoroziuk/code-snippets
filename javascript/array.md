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

## compact

Remove false values from an array

```typescript
const compact = (list: unknown[]) => list.filter(Boolean);
```

## safeSort

```typescript
const safeSort = <T>(list: T[], comparator: (a: T, b: T) => number) => list.slice().sort(comparator);
```

## nth

```typescript
type Indexed = string | unknown[];

const nth = <T extends Indexed>(source: T, index: number): T[number] => source[index];
```

## cast

Convert a non-array value into array.

```typescript
const cast = (value: unknown) => Array.isArray(value) ? value : [value];
```

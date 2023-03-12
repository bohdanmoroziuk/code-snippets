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

## sift/compact

Remove false values from an array

```typescript
const sift = <T>(list: readonly T[]) => list.filter(Boolean) as NonNullable<T>[];
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

Convert a non-array value into array

```typescript
const cast = (value: unknown) => Array.isArray(value) ? value : [value];
```

## drop

Return a new array with n elements removed from the left

```typescript
const drop = <T>(list: T[], size: number) => list.slice(size);
```

## dropRight

Return a new array with n elements removed from the right

```typescript
const dropRight = <T>(list: T[], size: number) => list.slice(0, -size);
```

## head/first

Return the head of an array

```typescript
const head = <T>(list: T[]) => list[0];
```

## last

Return the last element of an array

```typescript
const last = <T>(list: T[]) => list[list.length - 1];
```

## tail

Return the tail of an array

```typescript
const tail = <T>(list: T[]) => list.slice(1);
```

# Comparator

```typescript
type PredicateFunction<T> = (a: T, b: T) => boolean;

const comparator = <T>(predicate: PredicateFunction<T>) => {
  return (a: T, b: T) => {
    if (predicate(a, b)) return -1;
    if (predicate(b, a)) return 1;
    return 0;
  };
};
```

Usage

```typescript
[5, 1, 2, 8].slice().sort(comparator((a, b) => a < b))

// [ 1, 2, 5, 8 ]

interface User {
  id: number;
  age: number;
}

const users: User[] = [
  {
    id: 1,
    age: 26,
  },
  {
    id: 2,
    age: 20,
  },
  {
    id: 3,
    age: 28,
  },
];

users.slice().sort(comparator((a, b) => a.age > b.age))

// [
//   {
//     "id": 3,
//     "age": 28
//   },
//   {
//     "id": 1,
//     "age": 26
//   },
//   {
//     "id": 2,
//     "age": 20
//   }
// ]
```

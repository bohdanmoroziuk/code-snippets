# Generics and Augmentation

## Using Generics

```typescript
function getBy<T, P extends keyof T>(model: T[], prop: P, value: T[P]): T | null {
  return model.filter(item => item[prop] === value)[0] || null
}

// Usage

interface Student {
  name: string;
  age: number;
  hasScar: boolean;
};

const students: Student[] = [
  { name: 'Harry', age: 17, hasScar: true },
  { name: 'Ron', age: 17, hasScar: false },
  { name: 'Hermione', age: 16, hasScar: false }
];

const bestie = getBy(students, 'name', 'Ron');
```

## Augmenting Existing Types

```typescript
interface Array<T> {
  getBy<P extends keyof T>(prop: P, value: T[P]): T | null;
}

Array.prototype.getBy = function <T, P extends keyof T>(
  this: T[],
  prop: P,
  value: T[P]
): T | null {
  return this.filter(item => item[prop] === value)[0] || null;
};

// Usage

interface Student {
  name: string;
  age: number;
  hasScar: boolean;
};

const students: Student[] = [
  { name: 'Harry', age: 17, hasScar: true },
  { name: 'Ron', age: 17, hasScar: false },
  { name: 'Hermione', age: 16, hasScar: false }
];

const bestie = students.getBy('name', 'Ron');
```

```typescript
declare global {
  interface Array<T> {
    getBy<P extends keyof T>(prop: P, value: T[P]): T | null;
  }
}
```

```typescript
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
```

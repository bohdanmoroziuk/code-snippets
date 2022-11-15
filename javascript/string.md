# String

- Reverse a string

```typescript
const reverseString = (value: string) => 
  value
    .split('')
    .reverse()
    .join('');
```

- Convert a string into a slugified string

```typescript
const slugify = (value: string) => 
  value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
```

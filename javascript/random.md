# Random

- Generate fake IP

```typescript
const generateRandomIP = (): string =>
  [...new Array(4)]
    .map((_, index) => Math.floor(Math.random() * 255) + Number(Boolean(index)))
    .join('.');
```

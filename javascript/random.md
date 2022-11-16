# Random

- Generate fake IP

```typescript
const generateIP = (): string =>
  [...new Array(4)]
    .map((_, index) => Math.floor(Math.random() * 255) + Number(Boolean(index)))
    .join('.');
```

- Generate random hex

```typescript
const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;
```

- Generate a random string

```typescript
const randomString = () => Math.random().toString(36).slice(2);
```

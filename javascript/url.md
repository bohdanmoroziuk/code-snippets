# URL

- Check if the URL is absolute

```typescript
const isAbsoluteURL = (value: string) => /^[a-z][a-z0-9+.-]*:/.test(value);
```

- Get the base URL

```typescript
const getBaseURL = (value: string) => value.replace(/[?#].*$/, '');
```

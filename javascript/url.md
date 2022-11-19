# URL

- Check if the URL is absolute

```typescript
const isAbsoluteURL = (value: string) => /^[a-z][a-z0-9+.-]*:/.test(value);
```

- Check if the URL is relative

```typescript
const isRelativeURL = (value: string) => !/^([a-z]+:)?[\\/]/i.test(path);
```

- Get the base URL

```typescript
const getBaseURL = (value: string) => value.replace(/[?#].*$/, '');
```

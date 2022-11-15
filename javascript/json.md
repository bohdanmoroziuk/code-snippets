# JSON

- Check if JSON string is valid

```typescript
const isValidJSON = (value: string) => {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
}
```

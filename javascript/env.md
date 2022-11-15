# ENV

- Check if the code is running in Node.js

```typescript
const checkIsNode = (): boolean =>
  typeof process !== 'undefined' &&
  Object.prototype.toString.call(process) === '[object process]';
```

# computedEager

```typescript
import { watchEffect, shallowRef, readonly } from 'vue';

const eagerComputed = <T>(fn: () => T) => {
  const result = shallowRef<T>();

  watchEffect(() => {
    result.value = fn();
  }, 
  { flush: 'sync' },
);

  return readonly(result)
}
```

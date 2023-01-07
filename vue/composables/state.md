# useState

```typescript
import { ref, Ref } from 'vue';

export const useState = <T>(initialValue: T) => {
  const state = ref<T>(initialValue) as Ref<T>;

  const setState = (value: T) => {
    state.value = value;
  };

  return [state, setState] as const;
};

export type UseState = typeof useState;
```

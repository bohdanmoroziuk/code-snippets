# computedEager

Eager computed without lazy evaluation.

Learn more at [Vue: When a computed property can be the wrong tool](https://dev.to/linusborg/vue-when-a-computed-property-can-be-the-wrong-tool-195j).

- Use `computed()` when you have a complex calculation going on, which can actually profit
from caching and lazy evaluation and should only be (re-)calculated if really necessary.
- Use `computedEager()` when you have a simple operation, with a rarely changing return value – often a boolean.

```typescript
import { watchEffect, shallowRef, readonly } from 'vue';

export const computedEager = <T>(effect: () => T) => {
  const holder = shallowRef<T>();

  watchEffect(
    () => {
      holder.value = effect();
    },
    { flush: 'sync' },
  );

  return readonly(holder);
};
```

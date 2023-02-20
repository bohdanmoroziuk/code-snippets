# useInterval

```typescript
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
} from 'vue';

export type Timer = ReturnType<typeof setInterval> | null;

export interface UseIntervalOptions {
  immediate?: boolean;
}

export const useInterval = (
  handler: TimerHandler,
  timeout: number,
  options: UseIntervalOptions = {},
) => {
  const { immediate = false } = options;

  const timer = ref<Timer>(null);

  const isActive = computed(() => timer.value !== null);

  const stop = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  };

  const start = () => {
    stop();

    timer.value = setInterval(handler, timeout);
  };

  onMounted(() => {
    if (immediate) {
      start();
    }
  });

  onUnmounted(stop);

  return {
    isActive,
    start,
    stop,
  };
};
```

## Resources

- [Create your own custom Vue Hooks: useInterval](https://medium.com/@ankurr.singhal/create-your-own-custom-vue-hooks-useinterval-1d25ef6b56c6)

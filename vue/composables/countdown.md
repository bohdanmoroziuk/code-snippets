# useCountdown

```typescript
import {
  ref,
  readonly,
  onMounted,
  onUnmounted,
} from 'vue';

export type Timer = ReturnType<typeof setInterval> | null;

export interface UseCountdownOptions {
  interval?: number;
  immediate?: boolean;
}

export const useCountdown = (
  fromTime: number,
  toTime: number,
  options: UseCountdownOptions = {},
) => {
  const { interval = 1000, immediate = false } = options;

  // Time

  const time = ref(fromTime);

  const setTime = (value: number) => {
    time.value = value;
  };

  const resetTime = () => {
    time.value = fromTime;
  };

  const decrementTime = (step: number) => {
    setTime(time.value - step);
  };

  // Time

  let timer: Timer = null;

  const setTimer = (value: Timer) => {
    timer = value;
  };

  const resetTimer = () => {
    timer = null;
  };

  // Controls

  const isFinished = ref(false);

  const setFinished = (value: boolean) => {
    isFinished.value = value;
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      setFinished(true);
      resetTimer();
      resetTime();
    }
  };

  const tick = () => {
    decrementTime(interval);

    const shouldStop = time.value <= toTime;

    if (shouldStop) {
      stop();
    }
  };

  const start = () => {
    stop();
    setTimer(setInterval(tick, interval));
    setFinished(false);
  };

  onMounted(() => {
    if (immediate) {
      start();
    }
  });

  onUnmounted(stop);

  return {
    isFinished: readonly(isFinished),
    time: readonly(time),
    start,
    stop,
  };
};
```

# useWindowSize

```typescript
import { ref, onMounted, onUnmounted } from 'vue';

export const useWindowSize = () => {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const handleResize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return {
    width,
    height,
  };
};
```

## Resources

- [Custom Vue Composable: useWindowResize](https://medium.com/@ankurr.singhal/custom-vue-composable-usewindowresize-a3ba15eda5fe)

# useDocumentVisibility

```typescript
import { ref, readonly, onUnmounted } from 'vue';

const checkIsDocumentVisible = () => document.visibilityState === 'visible';

export const useDocumentVisible = () => {
  const isVisible = ref(checkIsDocumentVisible());

  const handleVisibilityChange = () => {
    isVisible.value = checkIsDocumentVisible();
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  });

  return readonly(isVisible);
};
```

## Resources

- [Vue Composable API: useDocumentVisible](https://medium.com/@ankurr.singhal/vue-composable-api-usedocumentvisible-22a5b6fff3e1)

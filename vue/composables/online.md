# useOnline

```typescript
export const useOnline = () => {
  const isOnline = ref(navigator.onLine);

  const setOnline = () => {
    isOnline.value = true;
  };

  const setOffline = () => {
    isOnline.value = false;
  };

  window.addEventListener('online', setOnline);
  window.addEventListener('offline', setOffline);

  onUnmounted(() => {
    window.removeEventListener('online', setOnline);
    window.removeEventListener('offline', setOffline);
  });

  return readonly(isOnline);
};
```

## Resources

- [Creating a custom Vue Composable Hook: useOnline](https://medium.com/@ankurr.singhal/creating-a-custom-vue-composable-hook-useonline-586280d774cf)

# Handle unsaved changes

## Prevent URL change and/or page reload

```typescript
import { ref, onMounted, onUnmounted } from 'vue';

const hasChanges = ref(true);

const handleBeforeUnload = () => {
  if (!hasChanges.value) return;

  event.preventDefault();
  event.returnValue = '';
};

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});
```

## Prevent router navigation

```typescript
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const hasChanges = ref(true);

const handleRouteLeave = () => {
  if (!hasChanges.value) return;

  const answer = window.confirm('Leave without saving?');

  return answer;
};

onBeforeRouteLeave(handleRouteLeave);
```

## Sources

- [How to prevent browser refresh, URL changes, or route navigation in Vue](https://austingil.com/prevent-browser-refresh-url-changes-route-navigation-vue/)

# Safe suspense component

```typescript
<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

const error = ref<Error | null>(null);

const handleError = (e: Error) => {
  error.value = e;

  return false;
};

onErrorCaptured(handleError);
</script>
```

```html
<template>
  <slot v-if="error" name="error" :error="error">
    <p>{{ error.message }}</p>
  </slot>
  <Suspense v-else>
    <template #default>
      <slot name="default" />
    </template>
    <template #fallback>
      <slot name="fallback" />
    </template>
  </Suspense>
</template>
```

## Usage

```typescript
<script setup lang="ts">
import {
  SafeSuspense,
  UserList,
  UserListSkeleton,
  UserListError,
} from 'src/components';
</script>
```

```html
<template>
  <SafeSuspense>
    <template #default>
      <UserList />
    </template>
    <template #fallback>
      <UserListSkeleton />
    </template>
    <template #error="{ error }">
      <UserListError :error="error" />
    </template>
  </SafeSuspense>
</template>
```

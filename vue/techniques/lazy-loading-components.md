# Lazy loading components

Lazily load components that are needed only under a certain condition.

[SafeSuspense](../components/safe-suspense.md)

## Async components

```typescript
// src/components/UserListAsync.ts

import { defineAsyncComponent } from 'vue';

import UserListError from '@/components/UserListError.vue';
import UserListSkeleton from '@/components/UserListSkeleton.vue';

const UserListAsync = defineAsyncComponent({
  loader: () => import('./UserList.vue'),
  loadingComponent: UserListSkeleton,
  errorComponent: UserListError,
  delay: 300,
  timeout: 5000,
  suspensible: false,
});

export default UserListAsync;

// src/App.vue

<script setup lang="ts">
import UserListAsync from '@/components/UserListAsync';
</script>

<template>
  <UserListAsync :users="[{ id: '1', name: 'Jordan Wild' }]" />
</template>
```

## Async components with Suspense

```typescript
// src/components/UserListAsync.ts

import { defineAsyncComponent } from 'vue';

const UserListAsync = defineAsyncComponent(() => import('./UserList.vue'));

export default UserListAsync;

// src/App.vue

<script setup lang="ts">
import UserListAsync from '@/components/UserListAsync';
import UserListError from '@/components/UserListError.vue';
import UserListSkeleton from '@/components/UserListSkeleton.vue';
</script>

<template>
  <SafeSuspense>
    <template #default>
      <UserListAsync :users="[{ id: '1', name: 'Jordan Wild' }]" />
    </template>
    <template #fallback>
      <UserListSkeleton />
    </template>
    <template #error>
      <UserListError />
    </template>
  </SafeSuspense>
</template>
```

## async setup()

```typescript
// src/components/UserListAsync.vue

<script setup lang="ts">
import { ref } from 'vue';

interface User {
  id: string;
  name: string;
}

const sleep = (delay: number) => (
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
);

const getUsers = async (): Promise<User[]> => {
  await sleep(3000);

  return [{ id: '1', name: 'Jordan Wild' }];
};

const users = ref<User[]>([]);

users.value = await getUsers();
</script>

<template>
  <ul>
    <li v-for="user of users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>

// src/App.vue

<script setup lang="ts">
import UserListAsync from '@/components/UserListAsync.vue';
import UserListError from '@/components/UserListError.vue';
import UserListSkeleton from '@/components/UserListSkeleton.vue';
</script>

<template>
  <SafeSuspense>
    <template #default>
      <UserListAsync />
    </template>
    <template #fallback>
      <UserListSkeleton />
    </template>
    <template #error>
      <UserListError />
    </template>
  </SafeSuspense>
</template>
```

# Route controlled panel modals

```typescript
// src/stores/users.ts

import { ref } from 'vue';

const users = ref([
  {
    id: '1',
    name: 'John Doe',
  },
  {
    id: '2',
    name: 'Jordan Wild',
  },
  {
    id: '3',
    name: 'Izumi Shinichi',
  },
]);

export const useUsersStore = () => {
  const deleteUser = (id: string) => {
    users.value = users.value.filter((user) => user.id !== id);
  };

  return {
    users,
    deleteUser,
  };
};

```

```typescript
// src/components/UserList.vue

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface User {
  id: string;
  name: string;
}

interface Props {
  users: User[];
}

interface Emits {
  (event: 'delete', payload: User['id']): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();
</script>

<template>
  <ul>
    <li v-for="user of users" :key="user.id">
      <p>{{ user.name }}</p>
      <button @click="emit('delete', user.id)">x</button>
    </li>
  </ul>
</template>

```

```typescript
// src/components/RoutePanel.vue

<template>
  <div class="route-panel">
    <slot />
  </div>
</template>

<style scoped>
.route-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  min-height: 100vh;
  z-index: 1024;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

```

```typescript
// src/components/RoutePanelView.vue

<template>
  <router-view #default="{ Component }">
    <transition name="slide-fade" appear mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}
</style>
```

```typescript
// src/router/routes.ts

const routes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/Users.vue'),
    children: [
      {
        path: ':id/delete',
        name: 'delete-user',
        props: true,
        component: () => import('@/views/UserDelete.vue'),
      },
    ],
  },
];
```

```typescript
// src/views/Users.vue

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useUsersStore } from '@/stores/users';

import UserList from '@/components/UserList.vue';
import RoutePanelView from '@/components/RoutePanelView.vue';

const router = useRouter();

const usersStore = useUsersStore();

const users = computed(() => usersStore.users.value);

const handleUserDelete = (id: string) => {
  router.push({
    name: 'delete-user',
    params: {
      id,
    },
  });
};
</script>

<template>
  <user-list :users="users" @delete="handleUserDelete" />
  <route-panel-view />
</template>
```

```typescript
// src/views/UserDelete.vue

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

import { useUsersStore } from '@/stores/users';

import RoutePanel from '@/components/RoutePanel.vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

const router = useRouter();

const usersStore = useUsersStore();

const handleDelete = () => {
  usersStore.deleteUser(props.id);
  router.push({ name: 'users' });
};

const handleCancel = () => {
  router.push({ name: 'users' });
};
</script>

<template>
  <route-panel>
    <div>
      <p>Are you sure you want to delete the user {{ id }}?</p>
      <button @click="handleDelete">Confirm</button>
      <button @click="handleCancel">Cancel</button>
    </div>
  </route-panel>
</template>
```

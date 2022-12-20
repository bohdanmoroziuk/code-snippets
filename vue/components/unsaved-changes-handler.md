# UnsavedChangesHandler

```typescript
<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  onMounted,
  onUnmounted,
} from 'vue';
import {
  onBeforeRouteLeave,
  NavigationGuard,
} from 'vue-router';

interface Props {
  hasChanges: boolean;
  confirmationMessage: string;
}

interface Emits {
  (event: 'leave'): void;
  (event: 'beforeunload'): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (!props.hasChanges) return;

  event.preventDefault();
  event.returnValue = '';

  emit('beforeunload');
};

const handleRouteLeave: NavigationGuard = () => {
  if (!props.hasChanges) return true;

  const answer = confirm(props.confirmationMessage);

  if (!answer) return false;

  emit('leave');

  return true;
};

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

onBeforeRouteLeave(handleRouteLeave);
</script>

<template>
  <slot />
</template>
```

## Usage

```typescript
// src/components/AuthForm.vue

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  modelValue: string;
}

interface Emits {
  (event: 'update:modelValue', payload: string): void;
  (event: 'submit'): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const handleChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const handleSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="email">
      Email:
      <input
        id="email"
        type="email"
        :value="modelValue"
        @input="handleChange"
      />
    </label>
    <button type="submit">Submit</button>
  </form>
</template>

// src/views/Auth.vue

<script setup lang="ts">
import { ref, computed } from 'vue';

import AuthForm from '@/components/AuthForm.vue';
import UnsavedChangesHandler from '@/components/UnsavedChangesHandler.vue';

const initialEmail = '';

const email = ref(initialEmail);

const hasChanges = computed(() => initialEmail !== email.value);

const confirmationMessage = 'All unsaved data will be lost. Are you sure you want to leave the page?';

const beforeunload = () => {
  console.log('beforeunload');
};

const leave = () => {
  console.log('leave');
};
</script>

<template>
  <div class="auth">
    <UnsavedChangesHandler
      :has-changes="hasChanges"
      :confirmation-message="confirmationMessage"
      @leave="leave"
      @beforeunload="beforeunload"
    >
      <AuthForm v-model="email" />
    </UnsavedChangesHandler>
  </div>
</template>
```

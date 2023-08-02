# Error boundary in Vue 3.3

## Implementation

```vue
<script setup lang="ts">
import { shallowRef, onErrorCaptured } from 'vue';

interface Props {
  stopPropagation?: boolean;
}

interface Emits {
  (event: 'error', payload: Error): void;
}

interface ErrorSlotProps {
  error: Error;
}

interface Slots {
  default: () => unknown;
  error: (props: ErrorSlotProps) => unknown;
}

const props = withDefaults(defineProps<Props>(), {
  stopPropagation: false,
});

const emit = defineEmits<Emits>();

const slots = defineSlots<Slots>();

const error = shallowRef<Error | undefined>(undefined);

const normalizeError = (e: unknown) => {
  if (e instanceof Error) return e;

  if (typeof e === 'string') return new Error(e);

  return new Error('Something went wrong');
};

const handleError = (e: unknown) => {
  error.value = normalizeError(e);

  emit('error', error.value);

  return props.stopPropagation ? false : true;
};

onErrorCaptured(handleError);
</script>

<template>
  <slot v-if="error" :error="error" name="error"></slot>
  <slot v-else></slot>
</template>
```

## Example

```vue
<script setup lang="ts">
import SignInForm from '@/components/SignInForm.vue';
import ErrorBoundary from '@/components/ErrorBoundary.vue';

const handleError = (error: Error) => {
  console.log('[ErrorBoundary]:', error.message);
};
</script>

<template>
  <ErrorBoundary
    stop-propagation
    @error="handleError"
  >
    <SignInForm />

    <template #error="{ error }">
      <p>
        {{ error.message }}
      </p>
    </template>
  </ErrorBoundary>
</template>
```
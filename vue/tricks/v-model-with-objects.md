# Using v-model with objects for custom components

```typescript
// /src/types.ts

export interface Credentials {
  login: string;
  password: string;
}
```

```vue
// /src/components/LoginForm.vue

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import { Credentials } from '@/types';

interface Props {
  modelValue: Credentials;
}

interface Emits {
  (event: 'update:modelValue', payload: Credentials): void;
  (event: 'submit'): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const updateValue = (key: keyof Credentials, event: Event) => {
  const { value } = event.target as HTMLInputElement;

  emit('update:modelValue', { ...props.modelValue, [key]: value });
};

const handleSubmit = () => {
  emit('submit');
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="login">
      <input
        type="text"
        name="login"
        id="login"
        :value="modelValue.login"
        @input="updateValue('login', $event)"
      >
    </label>
    <label for="password">
      <input
        type="password"
        name="password"
        id="password"
        :value="modelValue.password"
        @input="updateValue('password', $event)"
      >
    </label>
    <button type="submit">
      Login
    </button>
  </form>
</template>

```

```vue
// /src/pages/Login.vue

<script setup lang="ts">
import { ref } from 'vue';

import { Credentials } from '@/types';

import LoginForm from '@/components/LoginForm.vue';

const model = ref<Credentials>({
  login: '',
  password: '',
});

const submit = () => {
  console.log(model.value);
};
</script>

<template>
  <div>
    <LoginForm
      v-model="model"
      @submit="submit"
    />
  </div>
</template>
```

## Resources

- [Using v-model with objects in Vue3](https://dev.to/blindkai/objects-and-v-model-in-vue3-1l9h)
- [Vue.js: Using v-model with objects for custom components](https://simonkollross.de/posts/vuejs-using-v-model-with-objects-for-custom-components)

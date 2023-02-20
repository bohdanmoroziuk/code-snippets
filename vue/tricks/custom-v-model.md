# Custom v-model

## Vue 2

```vue
<script>
// src/components/VInput.vue

export default {
  name: 'VInput',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.handleInput({ target: { value } });
      },
    },
  },
};
</script>

<template>
  <input class="v-input" v-model="model" />
</template>
```

```vue
// src/App.vue

<script>
import VInput from '@/components/VInput.vue';

export default {
  name: 'App',
  components: {
    VInput,
  },
  data() {
    return {
      text: '',
    };
  },
};
</script>

<template>
  <div id="app">
    <v-input v-model="text" />
  </div>
</template>
```

## Vue 3

```vue
// src/components/VInput.vue

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

interface Props {
  modelValue: string;
}

interface Emits {
  (event: 'update:modelValue', payload: string): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <input class="v-input" v-model="model" />
</template>

```

```vue
// src/App.vue

<script>
import VInput from '@/components/VInput.vue';

export default {
  name: 'App',
  components: {
    VInput,
  },
  data() {
    return {
      text: '',
    };
  },
};
</script>

<template>
  <div class="app">
    <v-input v-model="text" />
  </div>
</template>

```

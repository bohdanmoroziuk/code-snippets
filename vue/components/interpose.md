# Interpose

```typescript
// src/components/Interpose.ts

import { h, defineComponent } from 'vue';

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'ul',
      validator: (value: string) => ['div', 'ul'].includes(value),
    },
  },
  setup(props, { slots }) {
    return () => {
      const children = slots.default?.()?.[0]?.children;

      if (!Array.isArray(children)) return null;

      const separator = slots.separator?.()?.[0];

      if (!separator) return h(props.tag, children);

      return h(props.tag, children.map((child, childIndex) => (
        childIndex === 0
          ? child
          : [separator, child]
      )));
    };
  },
});
```

## Usage

```typescript
// src/App.vue

<script setup lang="ts">
import Interpose from '@/components/Interpose';
</script>

<template>
  <div class="app">
    <Interpose>
      <template #separator>
        <li>---</li>
      </template>

      <template #default>
        <li v-for="item in 5" :key="item">
          {{ item }}
        </li>
      </template>
    </Interpose>
  </div>
</template>


// Result

// <ul>
//   <li>1</li>
//   <li>---</li>
//   <li>2</li>
//   <li>---</li>
//   <li>3</li>
//   <li>---</li>
//   <li>4</li>
//   <li>---</li>
//   <li>5</li>
// </ul>
```

## Sources

- [Creating an Interpose Vue component from a React implementation](https://itnext.io/creating-an-interpose-vue-component-from-a-react-implementation-80d367a695c6)

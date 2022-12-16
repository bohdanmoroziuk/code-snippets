# NoDataHandler

```typescript
<script setup lang="ts">
import { defineProps, computed } from 'vue';

interface Props {
  data: unknown;
  check: (value: unknown) => boolean;
}

const props = defineProps<Props>();

const hasData = computed(() => props.check(props.data));
</script>

<template>
  <slot v-if="hasData" :data="data"></slot>
  <slot name="no-data" v-else>
    <p>No data</p>
  </slot>
</template>
```

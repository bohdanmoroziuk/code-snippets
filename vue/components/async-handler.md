# AsyncHandler

```typescript
<script setup lang="ts">
import { defineProps } from 'vue';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface Props {
  status: Status;
  error: unknown;
}

defineProps<Props>();
</script>

<template>
  <div>
    <slot v-if="status === 'idle'"></slot>
    <slot name="loading" v-if="status === 'loading'">
      <p>Loading...</p>
    </slot>
    <slot name="error" :error="error" v-if="status === 'error'">
      <pre>
        {{ JSON.stringify(error, null, 2) }}
      </pre>
    </slot>
    <slot v-if="status === 'success'"></slot>
  </div>
</template>
```

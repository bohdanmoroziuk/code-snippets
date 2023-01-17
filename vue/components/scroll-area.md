# ScrollArea

```vue
<script>
export default {
  name: 'ScrollArea',
  props: {
    height: {
      type: String,
      default: '320px',
    },
    width: {
      type: String,
      default: '100%',
    },
  },
};
</script>

<template>
  <div
    class="scroll-area"
    :style="{ height, width }"
  >
    <slot />
  </div>
</template>

<style scoped>
.scroll-area {
  overflow: auto;
}
</style>
```

## Usage

```vue
<scroll-area>
  <privacy-policy-text />
</scroll-area>
```

# ModalPanel

- Vue 2:

```vue
<script>
export default {
  name: 'ModalPanel',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    open() {
      this.$emit('input', true);
    },
    close() {
      this.$emit('input', false);
    },
    toggle() {
      this.$emit('input', !this.value);
    },
  },
};
</script>

<template>
  <div class="modal-panel" v-if="value">
    <slot
      :open="open"
      :close="close"
      :toggle="toggle"
      :is-open="value"
    />
  </div>
</template>

<style scoped>
.modal-panel {
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

## Usage

```vue
<template>
  <modal-panel v-model="privacyPolicyDialog">
    <privacy-policy-dialog @submit="hidePrivacyPolicy" />
  </modal-panel>
</template>
```

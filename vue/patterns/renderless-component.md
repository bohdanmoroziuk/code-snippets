# Renderless component

```typescript
import { shallowRef, readonly, defineComponent } from 'vue';

export default defineComponent({
  name: 'UseToggle',
  props: {
    initiallyOn: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isOn = shallowRef(props.initiallyOn);

    const turnOn = () => {
      isOn.value = true;
    };

    const turnOff = () => {
      isOn.value = false;
    };

    const toggle = () => {
      isOn.value = !isOn.value;
    };

    return {
      isOn: readonly(isOn),
      turnOn,
      turnOff,
      toggle,
    };
  },
  render() {
    const {
      isOn,
      toggle,
      turnOn,
      turnOff,
      $slots,
    } = this;

    return $slots?.default?.({
      isOn,
      turnOn,
      turnOff,
      toggle,
    });
  },
});
```

## Usage

```html
<template>
  <use-toggle initially-on>
    <template #default="{ isOn, turnOn, turnOff, toggle }">
      <div>
        <p>{{ isOn ? 'on' : 'off' }}</p>
        <button @click="turnOn">
          On
        </button>
        <button @click="turnOff">
          Off
        </button>
        <button @click="toggle">
          Toggle
        </button>
      </div>
    </template>
  </use-toggle>
</template>
```

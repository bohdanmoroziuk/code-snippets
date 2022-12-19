# Renderless component

A renderless component is a component that doesn't render any of its own HTML.

Instead it only manages state and behavior, exposing a single scoped slot that
gives the parent/consumer complete control over what should actually be rendered.

## Types of Slot Props

You can pass anything to a slot, but I find it useful to think of every slot prop
as belonging to one of three categories:

- **Data**: The simplest type of slot prop is just data: strings, numbers, boolean values,
arrays, objects, etc.
- **Actions**: Action props are functions provided by the child component that the parent
can call to invoke some behavior in the child component.
- **Bindings**: Bindings are collections of attributes or event handlers that should be bound
to a specific element using v-bind or v-on. These are useful when you want to encapsulate
implementation details about how interacting with a provided element should work.

## So why is this useful? Separating Presentation and Behavior

Since renderless components only deal with state and behavior, they don't impose any
decisions about design or layout.

That means that if you can figure out a way to move all of the interesting behavior out
of a UI component, you can reuse the renderless component to implement any layout.

## So how does this work?

A renderless component exposes a single scoped slot where the consumer can provide
the entire template they want to render.
It doesn't have a template or render any HTML of its own; instead it uses a render function
that invokes the default scoped slot passing through any slot props, then returns the result.

## Example 1: UseToggle

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

## Example 2: UseTagsInput

## Sources

- [Renderless Components in Vue.js](https://adamwathan.me/renderless-components-in-vuejs/)

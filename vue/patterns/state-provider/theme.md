# ThemeContext

```typescript
// src/context/theme.ts

import {
  ref,
  provide,
  inject,
  readonly,
  Ref,
  defineComponent,
} from 'vue';

const THEME = Symbol('theme');

export type Theme = 'dark' | 'light';

export interface ThemeValue {
  theme: Readonly<Ref<Theme>>;
  toggleTheme: () => void;
}

export const useThemeProvider = (dark = false) => {
  const theme = ref<Theme>(dark ? 'dark' : 'light');

  const toggleTheme = () => {
    theme.value = theme.value === 'dark'
      ? 'light'
      : 'dark';
  };

  provide<ThemeValue>(THEME, {
    theme: readonly(theme),
    toggleTheme,
  });
};

export const useTheme = () => {
  const value = inject<ThemeValue>(THEME);

  if (value) return value;

  throw new Error('useTheme requires useThemeProvider/ThemeProvider in parent');
};

export const ThemeProvider = defineComponent({
  name: 'ThemeProvider',
  props: {
    dark: {
      type: Boolean,
      required: false,
    },
  },
  setup(props) {
    useThemeProvider(props.dark);
  },
  render() {
    return this.$slots?.default?.();
  },
});
```

## Usage

```typescript
// src/components/ThemeSwitch.vue

<script setup lang="ts">
import { useTheme } from '@/context/theme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <div>
    <p>Theme: {{ theme }}</p>
    <button @click="toggleTheme">
      Toggle
    </button>
  </div>
</template>
```

```typescript
// src/App.vue

// as composable

<script setup lang="ts">
import { useThemeProvider } from '@/context/theme';

import ThemeSwitch from '@/components/ThemeSwitch.vue';

useThemeProvider(false);
</script>

<template>
  <div class="app">
    <theme-switch />
  </div>
</template>

// as renderless component

<script setup lang="ts">
import { ThemeProvider } from '@/context/theme';

import ThemeSwitch from '@/components/ThemeSwitch.vue';

</script>

<template>
  <div class="app">
    <theme-provider>
      <theme-switch />
    </theme-provider>
  </div>
</template>
```

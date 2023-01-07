# useStateQueryParam

## Dependencies

- [useState](./state.md)

## Source code

```typescript
import { watchEffect } from 'vue';

import { useState } from '@/composables/state';

export const useStateQueryParam = <T>(
  key: string,
  fallbackState: T,
  serialize: (state: T) => string,
  deserialize: (state: string) => T,
  update: (key: string, state: string) => void,
) => {
  const getInitialState = () => {
    const params = new URLSearchParams(window.location.search);
    const existingParam = params.get(key);

    return existingParam
      ? deserialize(existingParam)
      : fallbackState;
  };

  const [state, setState] = useState(getInitialState());

  watchEffect(() => {
    update(key, serialize(state.value));
  });

  return [state, setState] as const;
};

export type UseStateQueryParam = typeof useStateQueryParam;
```

## Usage

```typescript
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useStateQueryParam } from '@/composables';

const router = useRouter();

const [filter, setFilter] = useStateQueryParam(
  'filter',
  {
    year: '2022',
    searchTerm: '',
  },
  (value) => JSON.stringify(value),
  (value) => JSON.parse(value),
  (key, value) => {
    const previousQuery = router.currentRoute.value.query;

    router.replace({
      query: {
        ...previousQuery,
        [key]: value,
      },
    });
  },
);

const year = computed({
  get() {
    return filter.value.year;
  },
  set(value: string) {
    setFilter({
      ...filter.value,
      year: value,
    });
  },
});

const searchTerm = computed({
  get() {
    return filter.value.searchTerm;
  },
  set(value: string) {
    setFilter({
      ...filter.value,
      searchTerm: value,
    });
  },
});
</script>

<template>
  <div>
    <input type="text" v-model="searchTerm" />
    <select v-model="year">
      <option value="2020">2020</option>
      <option value="2021">2021</option>
      <option value="2022">2022</option>
      <option value="2023">2023</option>
    </select>
  </div>
</template>
```

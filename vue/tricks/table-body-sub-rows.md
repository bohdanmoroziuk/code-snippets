# Table body sub rows

## Solution #1

```vue
// src/components/QTable.vue

<script setup lang="ts">
type Column = {
  name: string;
  label: string;
}

type Row = Record<string, string | number>

type Props = {
  columns: Column[];
  rows: Row[];
  rowKey: string;
}

defineProps<Props>();
</script>

<template>
  <table class="q-table">
    <thead>
      <tr>
        <th
          v-for="column of columns"
          :key="column.name"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot
        :columns="columns"
        :rows="rows"
        :row-key="rowKey"
        name="body"
      >
        <tr
          v-for="row of rows"
          :key="row[rowKey]"
        >
          <td
            v-for="column of columns"
            :key="column.name"
          >
            {{ row[column.name] }}
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</template>

// src/App.vue

<script setup lang="ts">
import { ref } from 'vue';

import QTable from '@/components/QTable.vue';

const columns = [
  // ...
]

const rows = [
  // ...
]

const expanded = ref<(string | number)[]>([]);

const toggleExpanded = (rowId: string | number) => {
  const index = expanded.value.indexOf(rowId);

  if (index === -1) {
    expanded.value.push(rowId);
  } else {
    expanded.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="app">
    <q-table
      :columns="columns"
      :rows="rows"
      row-key="name"
    >
      <template #body="{ columns, rows, rowKey }">
        <template
          v-for="row of rows"
          :key="row[rowKey]"
        >
          <tr @click="toggleExpanded(row[rowKey])">
            <td
              v-for="column of columns"
              :key="column.name"
            >
              {{ row[column.name] }}
            </td>
          </tr>
          <tr v-if="expanded.includes(row[rowKey])">
            <td :colspan="columns.length">
              This is expand slot for row above: {{ row[rowKey] }}
            </td>
          </tr>
        </template>
      </template>
    </q-table>
  </div>
</template>
```

## Solution #2

```vue
// src/types.ts

export type Column = {
  name: string;
  label: string;
}

export type Row = Record<string, string | number>

export type RowKey = string;

// src/composables/toggle.ts

import { ref } from 'vue';

export const useToggle = (initialValue = false) => {
  const value = ref(initialValue);

  const toggle = () => {
    value.value = !value.value;
  }

  return [value, toggle] as const;
};

// src/components/QTable.vue

<script setup lang="ts">
import type { Column, Row, RowKey } from '@/types';

type Props = {
  columns: Column[];
  rows: Row[];
  rowKey: RowKey;
}

defineProps<Props>();
</script>

<template>
  <table class="q-table">
    <thead>
      <tr>
        <th
          v-for="column of columns"
          :key="column.name"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot
        v-for="row of rows"
        :key="row[rowKey]"
        :columns="columns"
        :row="row"
        :row-key="rowKey"
        name="body"
      >
        <tr>
          <td
            v-for="column of columns"
            :key="column.name"
          >
            {{ row[column.name] }}
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</template>

// src/components/ProductTableRow.vue

<script setup lang="ts">
import type { Column, Row, RowKey } from '@/types';
import { useToggle } from '@/composables/toggle';

type Props = {
  columns: Column[];
  row: Row;
  rowKey: RowKey;
}

defineProps<Props>();

const [expanded, toggle] = useToggle();
</script>

<template>
  <tr @click="toggle">
    <td
      v-for="column of columns"
      :key="column.name"
    >
      {{ row[column.name] }}
    </td>
  </tr>
  <tr v-if="expanded">
    <td :colspan="columns.length">
      This is expand slot for row above: {{ row[rowKey] }}
    </td>
  </tr>
</template>

// src/App.vue

<script setup lang="ts">
import QTable from '@/components/QTable.vue';
import ProductTableRow from '@/components/ProductTableRow.vue';

const columns = [
  // ...
]

const rows = [
  // ...
]
</script>

<template>
  <div class="app">
    <q-table
      :columns="columns"
      :rows="rows"
      row-key="name"
    >
      <template #body="props">
        <product-table-row v-bind="props" />
      </template>
    </q-table>
  </div>
</template>
```
# Table body cell slots

```vue
// src/components/QTable.vue

<script setup lang="ts">
type Column = {
  name: string;
  label: string;
};

type Row = Record<string, string | number>;

type Props = {
  columns: Column[];
  rows: Row[];
  rowKey: string;
};

defineProps<Props>();

const makeBodyCellSlotName = (column: Column) => (
  `body-cell(${column.name})`
)
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
      <tr
        v-for="row of rows"
        :key="row[rowKey]"
      >
        <td
          v-for="column of columns"
          :key="column.name"
        >
          <slot
            :name="makeBodyCellSlotName(column)"
            :value="row[column.name]"
            :row="row"
          >
            {{ row[column.name] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.q-table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

.q-table th,
.q-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.q-table th {
  text-align: left;
  font-weight: bold;
  background-color: #fff;
}

.q-table tr:nth-child(odd){
  background-color: #f2f2f2;
}

.q-table tr:hover {
  background-color: #ddd;
}
</style>

// src/App.vue

<script setup lang="ts">
import QTable from '@/components/QTable.vue';

const columns = [
  // ...
]

const rows = [
  // ...
]
</script>

<template>
  <div class="app">
    <QTable
      :columns="columns"
      :rows="rows"
      row-key="name"
    >
      <template #body-cell(fat)="{ value }">
        {{ value }}
      </template>
    </QTable>
  </div>
</template>
```
# Quasar table component with action buttons

```vue
<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      @row-click="onRowClick"
    >
      <!-- 3. Add action buttons -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <div>
            <q-btn
              v-for="actionButton in actionButtons"
              :key="actionButton.name"
              :icon="actionButton.icon"
              :color="actionButton.color"
              @click.stop="performAction(props.value, actionButton.name)"
              dense
              flat
              size="sm"
              padding="xs"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const columns = ref(
  [
    {
      name: 'id',
      required: true,
      label: 'ID',
      align: 'left',
      field: (row) => row.id,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'name',
      required: true,
      label: 'Dessert (100g serving)',
      align: 'left',
      field: (row) => row.name,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'calories',
      align: 'center',
      label: 'Calories',
      field: 'calories',
      sortable: true,
    },
    {
      name: 'calcium',
      label: 'Calcium (%)',
      field: 'calcium',
      sortable: true,
      sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    },
    {
      name: 'iron',
      label: 'Iron (%)',
      field: 'iron',
      sortable: true,
      sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    },
    // 1. Add a column for actions
    {
      name: 'action',
      label: 'Action',
      field: 'action',
    },
  ],
);

const rows = ref([
  {
    id: 1,
    name: 'Frozen Yogurt',
    details: 'A frozen dessert made with yogurt and sometimes other dairy products including non-dairy products',
    calories: 159,
    calcium: '14%',
    iron: '1%',
    // 2. Add a payload for the action cell
    action: {
      id: 1,
    },
  },
  {
    id: 2,
    name: 'Ice cream sandwich',
    details: 'A frozen dessert consisting of ice cream between two skins, crusts, or other similar biscuit',
    calories: 237,
    calcium: '8%',
    iron: '1%',
    // 2. Add a payload for the action cell
    action: {
      id: 2,
    },
  },
  {
    id: 3,
    name: 'Eclair',
    details: 'An oblong pastry made with choux dough filled with a cream and topped with chocolate icing',
    calories: 262,
    calcium: '6%',
    iron: '7%',
    // 2. Add a payload for the action cell
    action: {
      id: 3,
    },
  },
]);

const actionButtons = ref([
  {
    name: 'Edit',
    icon: 'edit',
    color: 'blue-9',
  },
  {
    name: 'Delete',
    icon: 'delete',
    color: 'red-9',
  },
  {
    name: 'Log',
    icon: 'list',
    color: 'orange-9',
  },
]);

const onRowClick = (evt, row) => {
  // eslint-disable-next-line no-console
  console.log('row', row);
};

const performAction = (id, name) => {
  // eslint-disable-next-line no-console
  console.log('action', id, name);
};
</script>
```

## Resources

- [Quasar Table Component With Action Buttons](https://virajmadhushan.medium.com/quasar-table-component-with-action-buttons-c23d9935d2bd)

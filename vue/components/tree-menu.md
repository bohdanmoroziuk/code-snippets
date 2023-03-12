# TreeMenu.vue

## Implementation

```vue
// src/components/TreeMenu.vue

<script setup lang="ts">
import {
  ref,
  computed,
  defineProps,
  withDefaults,
} from 'vue';

// Props & emits

interface Node {
  label: string;
  children: Node[];
}

interface Props {
  node: Node;
  depth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  depth: 0,
});

// Children visibility

const shouldShowChildren = ref(false);

const toggleChildren = () => {
  shouldShowChildren.value = !shouldShowChildren.value;
};

// Child depth

const childDepth = computed(() => props.depth + 1);

// Indent style

const indentStyle = computed(() => ({
  marginLeft: `${props.depth * 10}px`,
}));
</script>

<template>
  <div
    class="tree-menu"
    :style="indentStyle"
  >
    <div
      class="tree-menu__label"
      @click="toggleChildren"
    >
      {{ node.label }}
    </div>
    <div
      class="tree-menu__children"
      v-if="shouldShowChildren"
    >
      <TreeMenu
        v-for="child of node.children"
        :key="child.label"
        :node="child"
        :depth="childDepth"
      />
    </div>
  </div>
</template>
```

## Usage

```vue
// src/App.vue

<script setup lang="ts">
import TreeMenu from '@/components/TreeMenu.vue';

const node = {
  label: 'root',
  children: [
    {
      label: 'item1',
      children: [
        {
          label: 'item1.1',
          children: [],
        },
        {
          label: 'item1.2',
          children: [
            {
              label: 'item1.2.1',
              children: [],
            },
          ],
        },
      ],
    },
    {
      label: 'item2',
      children: [],
    },
  ],
};
</script>

<template>
  <TreeMenu :node="node" />
</template>
```

## Resources

- [Build A Collapsible Tree Menu With Vue.js Recursive Components](https://medium.com/js-dojo/build-a-collapsible-tree-menu-with-vue-js-recursive-components-e598306dc3d1)

# TagsContext

```typescript
// src/context/tags.ts

import {
  shallowRef,
  readonly,
  defineComponent,
  provide,
  inject,
  Ref,
} from 'vue';

export interface Tag {
  id: number;
  name: string;
}

interface Value {
  tags: Readonly<Ref<readonly { readonly id: number; readonly name: string; }[]>>;
  addTag: (name: Tag['name']) => void;
  removeTag: (id: Tag['id']) => void;
}

const TAGS_KEY = Symbol('tags');

export const TagsProvider = defineComponent({
  name: 'TagsProvider',
  setup() {
    const tags = shallowRef<Tag[]>([
      {
        id: 1,
        name: 'javascript',
      },
      {
        id: 2,
        name: 'vue',
      },
    ]);

    const addTag = (name: Tag['name']) => {
      tags.value = [
        { id: tags.value.length + 1, name },
        ...tags.value,
      ];
    };

    const removeTag = (id: Tag['id']) => {
      tags.value = tags.value.filter((tag) => tag.id !== id);
    };

    provide<Value>(TAGS_KEY, {
      tags: readonly(tags),
      addTag,
      removeTag,
    });
  },
  render() {
    return this.$slots?.default?.();
  },
});

export const useTags = () => {
  const value = inject<Value>(TAGS_KEY);

  if (value) return value;

  throw new Error('useTags must be used inside of the TagsProvider component');
};
```

```typescript
// src/components/TagsStats.vue

<script setup lang="ts">
import { computed } from 'vue';

import { useTags } from 'src/context/tags';

const { tags } = useTags();

const tagsCount = computed(() => tags.value.length);
</script>

<template>
  <p>
    There are {{ tagsCount }} tags in the list.
  </p>
</template>
```

```typescript
// src/components/TagsList.vue

<script setup lang="ts">
import { useTags } from 'src/context/tags';

const { tags, removeTag } = useTags();

</script>

<template>
  <ul>
    <li v-for="tag of tags" :key="tag.id">
      <p>{{ tag.name }}</p>
      <button @click="removeTag(tag.id)">x</button>
    </li>
  </ul>
</template>
```

```typescript
// src/App.vue

<script setup lang="ts">
import { TagsProvider } from 'src/context/tags';
import TagsStats from 'src/components/TagsStats.vue';
import TagsList from 'src/components/TagsList.vue';
</script>

<template>
  <tags-provider>
    <tags-stats />
    <tags-list />
  </tags-provider>
</template>
```

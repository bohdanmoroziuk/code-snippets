# Simple JSON viewer component

```typescript
<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';

interface Props {
  value: unknown;
  replacer?: (string | number)[] | null
  space?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  replacer: undefined,
  space: 2,
});

function syntaxHighlight(json: string) {
  const value = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const regexp = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

  const replacer = (match: string) => {
    let className = 'json__value json__value--number';

    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        className = 'json__key';
      } else {
        className = 'json__value json__value--string';
      }
    } else if (/true|false/.test(match)) {
      className = 'json__value json__value--boolean';
    } else if (/null/.test(match)) {
      className = 'json__value json__value--null';
    }
    return `<span class="${className}">${match}</span>`;
  };

  return value.replace(regexp, replacer);
}

const displayValue = computed(() => (
  syntaxHighlight(JSON.stringify(
    props.value,
    props.replacer,
    props.space,
  ))
));
</script>

<template>
  <pre class="json" v-html="displayValue" />
</template>

<style>
.json {
  white-space: pre;
  background-color: ghostwhite;
  border: 1px solid silver;
  padding: 10px 20px;
  margin: 20px;
  border-radius: 4px;
  display: inline-block;
}

.json__key { color: red; }

.json__value--string { color: green; }

.json__value--number { color: darkorange; }

.json__value--boolean { color: blue; }

.json__value--null { color: magenta; }
</style>
```

## Usage

```typescript
<script setup lang="ts">
import { ref } from 'vue';

import { SimpleJsonViewer } from 'src/components';

class BaseError extends Error {
  constructor(message?: string) {
    super(message);

    this.name = this.constructor.name;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
    };
  }
}

const value = ref(new BaseError('Something went wrong!'));
</script>

<template>
  <simple-json-viewer :value="value" :space="4" />
</template>
```

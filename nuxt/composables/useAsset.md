# useAsset

## Implementation

```typescript
export function useAsset(path: string): string {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  });

  // @ts-expect-error: wrong type info
  return assets['/assets/' + path];
}
```

## Usage

```vue
<script setup lang="ts">
const src = useAsset('images/image.jpg');
</script>

<template>
  <img class="image" :src="src" />
</template>
```

## Resources

- [Assets with dynamic names are not resolved #14766](https://github.com/nuxt/nuxt/issues/14766)

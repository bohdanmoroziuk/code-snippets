# Tips & Tricks

## Check all checkboxes

```typescript
const selectAll = computed({
  get() {
    return selected.value.length === list.length;
  },
  set(value) {
    selected.value = value
      ? list.slice()
      : [];
  },
});
```

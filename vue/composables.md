# Composables

## useConfirm

A custom composable to prompt confirmation before action

```typescript
const useConfirm = <C, A>(message: string, onConfirm?: (() => C), onAbort?: (() => A)) => {
  const confirm = () => (
    window.confirm(message)
      ? onConfirm?.()
      : onAbort?.()
  );

  return confirm;
};

// Usage

const confirmDelete = useConfirm(
  'Are you sure you want to delete the record?',
  () => {
    console.log('The record has been deleted.');
    return true;
  },
  () => {
    console.log('The action was aborted.');
    return false;
  },
);
```

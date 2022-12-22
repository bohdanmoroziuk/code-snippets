# useFileDialog

```typescript
import {
  ref,
  readonly,
  onMounted,
  onUnmounted,
} from 'vue';

const defaultFileDialogOptions = {
  multiple: false,
  accept: '*',
};

interface FileDialogOptions {
  multiple?: boolean;
  accept?: string;
}

export const useFileDialog = (
  {
    multiple = defaultFileDialogOptions.multiple,
    accept = defaultFileDialogOptions.accept,
  }: FileDialogOptions = defaultFileDialogOptions,
) => {
  const inputRef = ref<HTMLInputElement>();

  const files = ref<File[]>([]);

  const handleFileChange = (event: Event) => {
    const fileList = (event.target as HTMLInputElement).files;

    files.value = fileList
      ? Array.from(fileList)
      : [];
  };

  const openFileDialog = () => {
    inputRef.value?.click();
  };

  const resetFiles = () => {
    files.value = [];
  };

  const createFileInput = () => {
    const input = document.createElement('input');

    input.type = 'file';
    input.hidden = true;
    input.accept = accept;
    input.multiple = multiple;

    input.addEventListener('change', handleFileChange);

    document.body.appendChild(input);

    inputRef.value = input;
  };

  const destroyFileInput = () => {
    inputRef.value?.removeEventListener('change', handleFileChange);
    inputRef.value?.remove();
    inputRef.value = undefined;
  };

  onMounted(createFileInput);

  onUnmounted(destroyFileInput);

  return {
    files: readonly(files),
    resetFiles,
    openFileDialog,
  };
};
```

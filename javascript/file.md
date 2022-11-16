# File

- Download a file

```typescript
const downloadFile = (url: string, fileName: string) => (
  fetch(url, {
    method: 'get',
    mode: 'no-cors',
    referrerPolicy: 'no-referrer',
  })
    .then((response) => response.blob())
    .then((blob) => {
      const anchor = document.createElement('a');
      const href = URL.createObjectURL(blob);

      anchor.setAttribute('download', fileName);
      anchor.setAttribute('href', href);
      anchor.setAttribute('target', '_blank');
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(href);
    })
);
```

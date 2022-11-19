# File

- Download a file

```typescript
const checkStatus = (response: Response) => {
  if (response.ok) return response;
  throw new Error(response.status.toString());
};

const toBlob = (response: Response) => response.blob();

const saveFile = (fileName: string) => (blob: Blob) => {
  const anchor = document.createElement('a');
  const href = URL.createObjectURL(blob);

  anchor.setAttribute('download', fileName);
  anchor.setAttribute('href', href);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(href);
};

const downloadFile = (url: string, fileName: string) => (
  fetch(url, {
    method: 'get',
    mode: 'no-cors',
    referrerPolicy: 'no-referrer',
  })
    .then(checkStatus)
    .then(toBlob)
    .then(saveFile(fileName))
);
```

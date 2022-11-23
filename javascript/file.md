# File

## downloadFile

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

## checkIsFileExist

```typescript
const checkIsFileExist = (file) => {
  const xhr = new XMLHttpRequest();

  xhr.open('HEAD', file, false);
  xhr.send();

  return xhr.status !== 404;
}
```

# Image

## checkIsImageExist

```typescript
const checkIsImageExist = (src) => {
  const image = new Image();

  image.src = src;

  return image.width !== 0;
}
```

## imageUrlToBase64

Convert image data to base64 by image url.

```typescript
export const imageUrlToBase64 = (imageUrl: string) => (
  new Promise((resolve) => {
    const image = new Image();

    image.crossOrigin = 'anonymous';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;

      context?.drawImage(image, 0, 0);

      const dataUrl = canvas.toDataURL();

      resolve(dataUrl);
    };

    image.src = imageUrl;
  })
);
```

## imageFileToBase64

Convert image selected from local to base64.

```typescript
export const imageFileToBase64 = (imageFile: File) => (
  new Promise((resolve) => {
    const fileReader = new FileReader();

    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      resolve(event.target?.result);
    };

    fileReader.readAsDataURL(imageFile);
  })
);
```

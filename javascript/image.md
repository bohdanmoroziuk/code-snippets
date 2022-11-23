# Image

## checkIsImageExist

```typescript
const checkIsImageExist = (src) => {
  const image = new Image();

  image.src = src;

  return image.width !== 0;
}
```

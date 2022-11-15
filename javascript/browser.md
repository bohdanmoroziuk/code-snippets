# Browser

- Notify on unsaved changes

```typescript
window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = '';
});
```

- Copy content to the clipboard

```typescript
const copyToClipboard = (content: string) => {
  const textarea = document.createElement('textarea');
  
  textarea.value = content;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('Copy');
  textarea.remove();
}
```

- Scroll smoothly to the top of the page

```typescript
const scrollToTop = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  
  if (scrollTop > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, scrollTop - scrollTop / 8);
  }
}
```

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

- Check the preferred color scheme of the user

```typescript
const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;
```

- Smooth-scroll elements into view

```typescript
const smoothScroll = (selector: string) =>
  document
    .querySelector(selector)
    .scrollIntoView({ behavior: 'smooth' });
```

- Check if the current tab is in view/focus

```typescript
const isTabInView = () => document.hidden;
```

- Check if an element is currently in focus

```typescript
const isElementInFocus = (element: Element) => element === document.activeElement;
```

## redirect

Do a redirect to a specified URL

```typescript
const redirect = (url: string, asLink = true) => {
  if (asLink) {
    window.location.href = url;
  } else {
    window.location.replace(url);
  }
};
```

## refresh

Refresh a website

```typescript
const refresh = () => window.location.reload();
```

# Tips and tricks

1. Download files using the `download` attribute

```html
<a href="path/to/file" download>Download</a>
```

2. Direct contact links

```html
<a href="mailto:example@email.com?subject=Hello&body=Nice to meet you">
  Send an email
</a>

<a href="tel:+123456789">
  Make a call
</a>

<a href="sms:+123456789?body=Hello">
  Send a text
</a>
```

3. Enhance security with `rel=”noopener”` and `rel=”noreferrer”`

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>
```

4. The `datalist` element for `input` suggestions

```html
<input list="browsers" name="browser">

<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Opera">
  <option value="Internet Explorer">
</datalist>
```

# Tips & Tricks

## Clickable area

```css
.clickable-area::before {
  content: "";
  position: absolute;
  top: -20px;
  right: -20px;
  bottom: -20px;
  left: -20px;
}
```

## Smooth Scroll

```css
.smooth-scroll {
  scroll-behavior: smooth;
}
```

## Select all text

```css
.select-all {
  user-select: all;
}

.select-all::selection {
  background-color: crimson;
  color: white;
}
```

## Disable selection of text

```css
.no-select {
  user-select: none;
}
```

## Disable user interaction

```css
.disabled,
[disabled] {
  pointer-events: none;
  user-select: none;
  cursor: not-allowed;
  opacity: 0.6;
}
```

## Night mode

```css
.night-mode {
  background-color: #fff;
  filter: invert(1) hue-rotate(210deg);
}
```

## Limit lines of text

```css
.cutoff-text {
  --max-lines: 5;
  --line-height: 1.5;

  max-height: calc(var(--max-lines) * 1em * var(--line-height));
  line-height: var(--line-height);

  overflow: hidden;
  position: relative;
}

.cutoff-text::before {
  content: '';
  position: absolute;
  height: calc(1em * var(--line-height));
  width: 100%;
  bottom: 0;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, white);
}
```

## Truncate a single line text using ellipsis

```css
.truncate {
  width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
```

## Truncate text after multiple lines using line-clamp

```css
.truncate-multiple {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical; 
  width: 250px;
  overflow: hidden;
}
```

## Custom scrollbar

The following example creates a thin (10px wide) scrollbar,
which has a grey track/bar color and a dark-grey (#888) handle:

```css
 /* Width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
} 
```

## Solve the problem of image 5px spacing

```css
img {
  display: block;
}
```

## Style broken images

```css
img::before {
  content: "Image not available";
  display: block;
  text-align: center;
  /* Additional styles here */
}
```

## Hide empty elements

```css
*:empty {
  display: none;
}
```

## Resources

- [How TO - Custom Scrollbar](https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp)
- [20+ CSS Tips and Tricks to Make You a Better Developer](https://fatfish.medium.com/20-css-tips-and-tricks-to-make-you-a-better-developer-f87fc0431700)
- [2 Simple ways you can truncate text using CSS](https://medium.com/@kritikapattalam/2-simple-ways-you-can-truncate-text-using-css-64d1596baa36)
- [15 Lesser Known CSS Tips and Tricks Every Web Developer Should Know](https://blog.devgenius.io/15-lesser-known-css-tips-and-tricks-every-web-developer-should-know-1caadb5258fb)
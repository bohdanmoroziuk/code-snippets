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

.select-all::selection{
  background-color: crimson;
  color: white;
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

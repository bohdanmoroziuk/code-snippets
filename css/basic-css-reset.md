# Basic CSS Reset

```css
/* General */

html {
  box-sizing: border-box;
  font-size: 16px;
}

html:focus-within {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  text-rendering: optimizeSpeed;
}

* {
  margin: 0;
  padding: 0;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

/* Lists */

ol[role="list"],
ul[role="list"] {
  list-style: none;
}

/* Images, Pictures and SVGs */

img,
svg,
picture {
  max-width: 100%;
  display: block;
}

/* Another variant to reset css for images */
/* img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  font-style: italic;
  background-repeat: no-repeat;
  background-size: cover;
  shape-margin: 0.75rem;
} */


/* Videos */

video {
  max-width: 100%;
  height: auto;
}

/* Canvas */

canvas {
  display: block;
  max-width: 100%;
}

/* Tables */

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

/* Forms */

input,
textarea,
select {
  font: inherit;
}

textarea:not([rows]) {
  min-height: 10em;
}

/* Buttons */

button {
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
}

/* Anchors */

a {
  text-decoration: none;
  color: inherit;
}

:target {
  scroll-margin-block: 5ex;
}

/* Text */

h1,
h2,
h3,
h4,
h5,
h6,
p {
  overflow-wrap: break-word;
}

/* Quotes */

blockquote,
q {
  quotes: none;
}

blockquote:after,
blockquote:before,
q:after,
q:before {
  content: "";
  content: none;
}

/* Attributes & States */

.hidden,
[hidden] {
  display: none !important;
}

.disabled,
[disabled] {
  cursor: not-allowed;
}

:focus:not(:focus-visible) {
  outline: none;
}

/* Screen reader only utility */

.sr-only {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  left: -9999px;
  top: -9999px;
}
```

## Examples

- [_reset.scss](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/styles/generic/_reset.scss)
- [base.scss](https://github.com/ireade/css/blob/master/base.scss)
- [the-new-css-reset](https://elad2412.github.io/the-new-css-reset/)

## Sources

- [Minimal CSS Reset](https://www.digitalocean.com/community/tutorials/css-minimal-css-reset)
- [My CSS Reset/Base](https://bitsofco.de/my-css-reset-base/)
- [A (more) Modern CSS Reset](https://andy-bell.co.uk/a-more-modern-css-reset/)
- [A simple CSS Reset](https://ehtmlu.com/blog/a-simple-css-reset/)
- [Basic CSS reset](https://weekendprojects.dev/design/basic-css-reset/)
- [A better image reset for your CSS](https://www.youtube.com/watch?v=345V2MU3E_w&list=WL&index=12)
- [CSS Reset](https://kolosek.com/css-reset/)
- [CSS Reset](https://medium.com/swlh/css-reset-2b4831d4664e)
- [Basic CSS resets to apply in every app](https://itnext.io/basic-css-resets-to-apply-in-every-app-9bd724dc4f49)
- [My Custom CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/)
# Code splitting

Three patterns for code splitting a Vue.js single page app:

- By page

Splitting your code by page is an obvious place to start.

- By page fold

Below the “fold” is any part of the page that is not visible in the viewport when the page initially loads.
You can asynchronously load this content since the user will usually take a second or two to read above
the fold before they scroll down, especially on the first time they visit the site.

- By condition

Another good candidate for code splitting is anything that is shown conditionally.
For example a modal window, tabs, drop down menus etc.

# Performance

## Overview

Vue is designed to be performant for most common use cases without much need for
manual optimizations. However, there are always challenging scenarios where extra
fine-tuning is needed.

First, let's discuss the two major aspects of web performance:

- **Page Load Performance**: how fast the application shows content and becomes
interactive on the initial visit. This is usually measured using web vital metrics
like `Largest Contentful Paint (LCP)` and `First Input Delay (FID)`.
- **Update Performance**: how fast the application updates in response to user input.

## Profiling Options

To improve performance, we need to first know how to measure it. There are a number
of great tools that can help in this regard:

For profiling load performance of production deployments:

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

For profiling performance during local development:

- [Chrome DevTools Performance Panel](https://developer.chrome.com/docs/devtools/performance/)
- [Vue DevTools Extension](https://vuejs.org/guide/scaling-up/tooling.html#browser-devtools)

## Page Load Optimizations 

### Choosing the Right Architecture

- SPA
- SSR
- SSG

### Bundle Size and Tree-shaking

One of the most effective ways to improve page load performance is shipping
smaller JavaScript bundles. Here are a few ways to reduce bundle size when
using Vue:

- Use a build step if possible.
- Be cautious of size when introducing new dependencies!
  - If using a build step, prefer dependencies that offer ES module formats and
    are tree-shaking friendly.
  - Check a dependency's size and evaluate whether it is worth the functionality
    it provides.
      - [bundlephobia](https://bundlephobia.com/)
      - [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- If you are using Vue primarily for progressive enhancement and prefer to avoid
a build step, consider using petite-vue (only 6kb) instead.

### Code Splitting nad Lazy Loading

As the name suggests lazy loading is a process of loading parts (chunks) of your
application lazily. In other words — loading them only when we really need them.
Code splitting is just a process of splitting the app into this lazily loaded
chunks.

- Dynamic imports

  We can easily load some parts of our application lazily with webpack dynamic imports.
  Let’s see how they work and how they differ from regular imports.

  ```ts
  function loadLazy() {
    return import('./lazy.js')
  }
  ```

- Async components

  Which components should you load lazily? The answer to this question is trivial
  and intuitive - everything that is not required on initial render.

  ```ts
  import { defineAsyncComponent } from 'vue'

  const Foo = defineAsyncComponent(() => import('./Foo.vue'))
  ```

- Route components

  For applications using Vue Router, it is strongly recommended to use lazy loading
  for route components.

  ```ts
  const Home = () => import(/* webpackChunkName: "home" */ './Home.vue');
  const About = () => import(/* webpackChunkName: "about" */ './About.vue');
  const Contact = () => import(/* webpackChunkName: "contact" */ './Contact.vue');

  const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/contact', name: 'contact', component: Contact }
  ];
  ```

## Update Optimizations

### Props Stability 

- In Vue, a child component only updates when at least one of its received props
has changed.
- In general, the idea is keeping the props passed to child components as stable
as possible.

  ```ts
  <ListItem
    v-for="item in list"
    :id="item.id"
    :active="item.id === activeId"
  />
  ```

### v-once

`v-once` is a built-in directive that can be used to render content that relies
on runtime data but never needs to update.

### v-memo
​
`v-memo` is a built-in directive that can be used to conditionally skip the update
of large sub-trees or v-for lists.

## General Optimizations

The following tips affect both page load and update performance.

### Virtualize Large Lists

One of the most common performance issues in all frontend applications is rendering
large lists.

### Reduce Reactivity Overhead for Large Immutable Structures

Vue's reactivity system is deep by default. While this makes state management
intuitive, it does create a certain level of overhead when the data size is
large, because every property access triggers proxy traps that perform dependency
tracking. 

Vue does provide an escape hatch to opt-out of deep reactivity by using `shallowRef()`
and `shallowReactive()`.

### Avoid Unnecessary Component Abstractions

Sometimes we may create renderless components or higher-order components for better
abstraction or code organization. While there is nothing wrong with this, do keep
in mind that component instances are much more expensive than plain DOM nodes, and
creating too many of them due to abstraction patterns will incur performance costs.

### Harness the Power of Browser Capabilities

- Leverage Browser Caching

  - Set Appropriate Cache Headers for Static Assets

    Don’t let static assets go stale! By setting appropriate cache headers,
    you can instruct the browser to cache these assets locally. 

  - Utilize localStorage or IndexedDB for Client-Side Caching

    By utilizing features like localStorage or IndexedDB, you can cache
    data on the user’s device.

- Explore Web Worker Usage

  - Offload Intensive Tasks to Web Workers for Improved Responsiveness

    Web workers allow you to run computationally intensive operations in
    the background, freeing up the main thread for a smoother user
    experience.

  - Utilize Service Workers for Offline Caching and Faster Load Times

    Service workers enable you to cache your Vue.js application’s assets
    and content, making them available even when the user is offline.

### Optimize Network Requests

- Reduce HTTP Requests

  - Consolidate Multiple Requests into a Single Request

    Reduce the number of HTTP requests by combining multiple smaller
    requests into a single, efficient request. This reduces the overhead
    of establishing multiple connections and minimizes the time spent
    waiting for responses.

  - Utilize HTTP Caching Mechanisms for Static Assets

    Don’t let static assets weight you down! Leverage the power of HTTP
    caching mechanisms to store static assets in the user’s browser. By
    specifying proper cache headers, you can instruct the browser to fetch
    assets from the cache instead of making redundant network requests.

- Implement Intelligent Data Fetching

  - Employ Pagination or Infinite Scrolling for Large Data Sets

    Implement pagination or infinite scrolling techniques to fetch data in
    smaller, manageable chunks. Instead of overwhelming the user with an
    ocean of information, load data dynamically as they navigate or scroll.

  - Optimize API Calls with GraphQL or Efficient RESTful Endpoints

    Explore GraphQL, a powerful query language, to fetch precisely the data
    you need, minimizing unnecessary data transfer. Alternatively, optimize
    your RESTful endpoints by fine-tuning them to return only relevant data. 

### Asset handling

- Optimize your images.
  
  Make sure your images are properly sized and compressed, and serve responsive
  images. Think about using next-gen formats like WebP.

- Optimize font usage.

  Only load the fonts you need, and make sure text is visible for users until
  they are finished loading

- Lazy-load images and videos. 

  It makes sense to only load the resources that your users need at that moment.
  Postpone loading images and videos that are off-screen at first, and lazy load
  them later.

- Preload/prefetch important assets.

  Prioritize the fetching of critical assets – for example by preloading images
  in your header or hero section so users see them faster.

- Use caching so your users don't have to download the same assets multiple times.

### Code performance

- Check for memory leaks like event listeners that are active although you don’t
need them, variables leaking into global scope, timers not being cleared...
- Optimize event handling
- Minimize reflow and repaint operations that calculate the position of each node
and change their appearance.
- Avoid unnecessary component updates/rendering loops. Update only what is needed!

## Resources

- [Vue Performance](https://vuejs.org/guide/best-practices/performance.html)
- [Vue.js Performance Guide](https://madewithvuejs.com/blog/vuejs-performance-guide)
- [Vuejs App Performance Optimization: Top Reasons](https://www.bacancytechnology.com/blog/vuejs-app-performance-optimization)
- [How to make Vue.js 3000 times faster](https://javascript.plainenglish.io/how-to-make-vue-js-3000-times-faster-826ee04a2491)

---

-  [Code Splitting With Vue.js And Webpack](https://vuejsdevelopers.com/2017/07/03/vue-js-code-splitting-webpack/)
-  [3 Code Splitting Patterns For VueJS and Webpack](https://vuejsdevelopers.com/2017/07/08/vue-js-3-ways-code-splitting-webpack/)

--- 

-  [Lazy loading and code splitting in Vue.js](https://vueschool.io/articles/vuejs-tutorials/lazy-loading-and-code-splitting-in-vue-js/)
-  [Vue.js Router Performance](https://vueschool.io/articles/vuejs-tutorials/vue-js-router-performance/)
-  [Lazy Loading Individual Vue Components and Prefetching](https://vueschool.io/articles/vuejs-tutorials/lazy-loading-individual-vue-components-and-prefetching/)
-  [Optimizing third-party libraries](https://vueschool.io/articles/vuejs-tutorials/vue-js-performance-optimizing-third-party-libraries/)
-  [Mastering Browser Cache](https://vueschool.io/articles/vuejs-tutorials/vue-js-performance-mastering-cache/)
-  [Nuxt SSR Optimizing Tips](https://vueschool.io/articles/vuejs-tutorials/nuxt-ssr-optimizing-tips/)
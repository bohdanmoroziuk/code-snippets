# Storing and Using the Last Visited Route in Vue

```typescript
// src/router.ts

import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import Hello from '@/views/Hello';
import Goodbye from '@/views/Goodbye';

Vue.use(Router);

const LAST_VISITED_ROUTE_KEY = 'lastVisitedRoute'

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/hello', name: 'hello', component: Hello },
    { path: '/goodbye', name: 'goodbye', component: Goodbye },
  ],
});

let isFirstTransition = true;

router.beforeEach((to, from, next) => {
  const lastVisitedRoute = localStorage.getItem(LAST_VISITED_ROUTE_KEY);
  
  const shouldRedirect = Boolean(
    to.name === 'home'
    && lastVisitedRoute 
    && isFirstTransition
  );

  if (shouldRedirect) next({ name: lastVisitedRoute.name });
  else next();

  isFirstTransition = false;
});

router.afterEach((to) => {
  localStorage.setItem(LAST_VISITED_ROUTE_KEY, to);
});

export default router;
```

## Sources

- [Storing and Using the Last Known Route in Vue](https://css-tricks.com/storing-and-using-the-last-known-route-in-vue/)

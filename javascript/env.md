# ENV

- Check if the code is running in browser

```typescript
const isBrowser = () => typeof window !== 'undefined';
```

- Check if the code is running in Node.js

```typescript
const checkIsNode = (): boolean =>
  typeof process !== 'undefined' &&
  Object.prototype.toString.call(process) === '[object process]';
```

- Get user agent

```typescript
const userAgent = inBrowser && window.navigator.userAgent.toLowerCase();

const isIE = userAgent && /msie|trident/.test(UA);

const isIE9 = userAgent && userAgent.indexOf('msie 9.0') > 0;

const isEdge = userAgent && userAgent.indexOf('edge/') > 0;

const isAndroid = (userAgent && userAgent.indexOf('android') > 0); 

const isIOS = (userAgent && /iphone|ipad|ipod|ios/.test(userAgent));

const isChrome = userAgent && /chrome\/\d+/.test(userAgent) && !isEdge;

const isPhantomJS = userAgent && /phantomjs/.test(userAgent);

const isFirefox = userAgent && userAgent.match(/firefox\/(\d+)/);
```

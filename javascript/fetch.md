# Fetch

- Retry the request if the response is not ok

```typescript
type Fetcher = () => Promise<Response>;

export const retry = (fn: Fetcher, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    fn()
      .then((response) => {
        if (response.ok) return resolve(response);

        if (retriesLeft > 0) {
          setTimeout(() => {
            retry(fn, retriesLeft - 1, interval).then(resolve, reject);
          }, interval);
        } else {
          reject(new Error('Maximum retries exceeded'));
        }
      })
      .catch(reject);
  });
};
```

- Retry the request if an error occurred

```typescript
type Fetcher = () => Promise<Response>;

export const retry = (fn: Fetcher, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        if (retriesLeft > 0) {
          setTimeout(() => {
            retry(fn, retriesLeft - 1, interval).then(resolve, reject);
          }, interval);
        } else {
          reject(new Error('Maximum retries exceeded'));
        }
      });
  });
};
```

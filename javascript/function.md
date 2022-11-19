# Function

- Call a function only once

```typescript
const once = (fn: Function) => {
  let called = false;

  return (...args: unknown[]) => {
    if (!called) {
      called = true;
      fn(...args);
    }
  };
};
```

- Memoize a function

```typescript
const createHash = (value: unknown) => JSON.stringify(value);

const memoize = (fn: Function) => {
  const cache = {};

  return (...args: unknown[]) => {
    const hash = createHash(args);

    if (cache[hash]) {
      return cache[hash];
    }

    cache[hash] = fn(...args);

    return cache[hash];
  };
};
```

- Memoize a function using LRUCache

```typescript
class LRUCache {
  private cache: Map<string, unknown>;
  private capacity: number;

  constructor(capacity: number) {
    this.cache = new Map<string, unknown>();
    this.capacity = capacity;
  }

  has(key: string) {
    return this.cache.has(key);
  }

  get(key: string) {
    if (!this.has(key)) return undefined;

    const value = this.cache.get(key);

    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key: string, value: unknown) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys()[0]);
    }
  }
}

const createHash = (value: unknown) => JSON.stringify(value);

const memoize = (fn: Function, cacheCapacity: number) => {
  const cache = new LRUCache(cacheCapacity);

  return (...args: unknown[]) => {
    const hash = createHash(args);

    if (cache.has(hash)) {
      return cache.get(hash);
    }

    const result = fn(...args);

    cache.put(hash, result);

    return result;
  };
};
```

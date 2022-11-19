# LRUCache

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
```

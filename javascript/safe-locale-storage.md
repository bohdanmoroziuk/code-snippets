# SafeLocaleStorage

```typescript
const isSupportsLocaleStorage = () => {
  try {
    localStorage.setItem('test-key', 'test-value');
    localStorage.getItem('test-key');
    localStorage.removeItem('test-key');

    return true;
  } catch (error) {
    return false;
  }
};

class Memory implements Storage {
  private cache: Record<string, string | null> = {};

  get length() {
    return Object.keys(this.cache).length;
  }

  key(index: number) {
    return Object.keys(this.cache)[index] || null;
  }

  getItem(key: string) {
    return this.cache[key];
  }

  setItem(key: string, value: string) {
    this.cache[key] = value;
  }

  removeItem(key: string) {
    this.cache[key] = null;
  }

  clear() {
    this.cache = {};
  }
}

const storage = isSupportsLocaleStorage() ? localStorage : new Memory();

export default storage;
```

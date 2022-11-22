# Proxy

## createSafeSorter

```typescript
const createSafeSorter = <T>(list: T[]) => {
  return new Proxy(list, {
    get(target, property, receiver) {
      if (property === 'sort') {
        return (comparator: (a: T, b: T) => number) => (
          createSafeSorter(list.slice().sort(comparator))
        );
      }

      return Reflect.get(target, property, receiver);
    }
  });
};

const unsorted = createSafeSorter([5, 2, 4, 1, 3]);

const lowToHigh = unsorted.sort((a, b) => a - b);

const highToLow = lowToHigh.sort((a, b) => b - a);
```

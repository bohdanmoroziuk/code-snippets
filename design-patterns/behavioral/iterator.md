# Iterator

## Intent

**Iterator** is a behavioral design pattern that lets you traverse
elements of a collection without exposing its underlying
representation (list, stack, tree, etc.).

## Structure

1. The **Iterator** interface declares the operations required for traversing
a collection.
2. **Concrete Iterators** implement specific algorithms for traversing
a collection.
3. The **Collection** interface declares one or multiple methods for
getting iterators compatible with the collection.
4. **Concrete Collections** return new instances of a particular concrete
iterator class each time the client requests one.
5. The **Client** works with both collections and iterators via their
interfaces.

## Applicability

- Use the Iterator pattern when your collection has a complex
data structure under the hood, but you want to hide its complexity
from clients.
- Use the pattern to reduce duplication of the traversal code
across your app.
- Use the Iterator when you want your code to be able to traverse
different data structures or when types of these structures
are unknown beforehand.

## Implementation

1. Declare the iterator interface. At the very least, it must have a
method for fetching the next element from a collection.
2. Declare the collection interface and describe a method for
fetching iterators.
3. Implement concrete iterator classes for the collections that
you want to be traversable with iterators.
4. Implement the collection interface in your collection classes.
5. Go over the client code to replace all of the collection traversal
code with the use of iterators.

## Examples

- Example #1

```typescript
interface Iterator<T> {
  next(): T | undefined;
  hasNext(): boolean;
}

interface IterableCollection<T> {
  createIterator(): Iterator<T>;
}

class ConcreteIterator implements Iterator<number> {
  private _collection: number[];
  private _index: number = 0;

  constructor(collection: number[]) {
    this._collection = collection;
  }

  next() {
    if (this.hasNext()) {
      const item = this._collection[this._index];
  
      this._index += 1;
      
      return item;
    }

    return undefined;
  }

  hasNext() {
    return this._index < this._collection.length;
  }
}


class ConcreteCollection implements IterableCollection<number> {
  private _collection: number[] = [];

  constructor(collection: number[]) {
    this._collection = collection;
  }

  createIterator(): Iterator<number> {
    return new ConcreteIterator(this._collection);
  }
}

(function main() {
  const collection: ConcreteCollection = new ConcreteCollection([0, 1, 2, 3]);
  const iterator: Iterator<number> = collection.createIterator();

  while (iterator.hasNext()) {
    const number = iterator.next();

    console.log(`Logging: ${number.valueOf()}`);
  }
})();
```

- Example #2

```typescript
interface IteratorResult<T> {
  done: boolean;
  value: T | undefined;
}

interface Iterator<T> {
  next(): IteratorResult<T>;
}

class Component {
  constructor (public name: string) {}
}

class Frame implements Iterator<Component> {
  private pointer = 0;

  constructor(
    public name: string,
    public components: Component[]
  ) {}

  public next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    } else {
      return {
        done: true,
        value: undefined
      }
    }
  }

}

let frame = new Frame(
  "Door",
  [
    new Component("top"),
    new Component("bottom"),
    new Component("left"),
    new Component("right")
  ]
);

let iteratorResult1 = frame.next(); // { done: false, value: Component { name: 'top' } }
let iteratorResult2 = frame.next(); // { done: false, value: Component { name: 'bottom' } }
let iteratorResult3 = frame.next(); // { done: false, value: Component { name: 'left' } }
let iteratorResult4 = frame.next(); // { done: false, value: Component { name: 'right' } }
let iteratorResult5 = frame.next(); // { done: true, value: null }
```

## Resources

- [Iterator Pattern in TypeScript](https://medium.com/design-patterns-in-typescript/iterator-pattern-in-typescript-9d16b0146804)
- [Design patterns in TypeScript/Iterator](https://github.com/gztchan/design-patterns-in-typescript/blob/master/iterator/iterator.ts)
- [Iterators](https://basarat.gitbook.io/typescript/future-javascript/iterators)

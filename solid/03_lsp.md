# Liskov Substitution Principle

Barbara Liskov's substitution principle goes like this: functions that use a base type,
should be able to use subtypes of the base type without knowing it.
In simple words, descendant classes should not contradict the base class.
For example, they cannot provide an interface smaller than the base one. Behavior of heirs
should be expected for functions that use the base class.
It's a little more convenient to think of LSP in terms of "abstraction - implementation".
Abstract class or interface play the role of a base type, but at the same time - the role of a contract for behavior.

## Example

```typescript
abstract class Disposable {
  protected source: number;

  constructor(fn: Function, delay: number) {}

  dispose(): void {}
}

class Interval extends Disposable {
  constructor(fn: Function, delay: number) {
    super(fn, delay);

    this.source = setInterval(fn, delay);
  }

  dispose(): void {
    clearInterval(this.source);
  }
}

class Timer extends Disposable {
  constructor(fn: Function, delay: number) {
    super(fn, delay);

    this.source = setTimeout(fn, delay);
  }

  dispose(): void {
    clearTimeout(this.source);
  }
}

const cleanup = (disposable: Disposable) => {
  disposable.dispose();
};

const interval = new Interval(() => console.log('Hey'), 1000);

const timer = new Timer(() => window.alert('Hey'), 1000);

cleanup(interval);

cleanup(timer);
```

Barbara Liskov's substitution principle:

- helps to design the system based on the behavior of the modules;
- introduces restrictions and inheritance rules for objects so that their descendants do not contradict the basic behavior;
- makes the behavior of modules consistent and predictable;
- helps to avoid duplication, to allocate functionality common to several modules into a common interface;
- allows you to identify problematic abstractions and hidden relationships between entities during design.

**The main goal of the Liskov substitution principle is to "eliminate surprises" in the behavior of objects.**

# Null Object

![Null Object Pattern](https://sourcemaking.com/files/v2/content/patterns/Null_Object2.png)

The null object design pattern is a software design pattern
that provides a way to represent the absence of a value or
an “empty” object. It is often used as an alternative to
using a special value such as `null` or `None` to represent
the absence of a value.

The null object pattern involves creating a special "null"
object that implements the same interface as the object it
is representing, but does not perform any actions. This null
object can be used in place of a real object when the real
object is not available or not required.

One of the main benefits of the null object pattern is that
it helps to avoid null reference exceptions, which can occur
when attempting to access a member of a null object. By using
a null object instead of a `null` value, it is possible to
avoid these exceptions and provide a more predictable and
stable program.

The null object pattern can be useful in a variety of contexts,
such as when working with optional method arguments or when
dealing with missing or optional data. It can also be used to
simplify code by eliminating the need to check for `null`
values or to provide default behavior when an object is not
available.

## Example

```typescript
interface Saiyan {
  name: string;
  power: number;
}

abstract class AbstractSaiyan {
  protected name: string;

  protected power: number;

  constructor(saiyan: Saiyan) {
    this.name = saiyan.name;
    this.power = saiyan.power;
  }

  abstract getName(): string;

  abstract toString(): string;
}

class RealSaiyan extends AbstractSaiyan {
  constructor(saiyan: Saiyan) {
    super(saiyan);
  }

  getName(): string {
    return this.name;
  }

  toString(): string {
    return `${this.name} - ${this.power}`;
  }
}

class NullSaiyan extends AbstractSaiyan {
  constructor() {
    super({ name: 'Not available', power: 0 });
  }

  getName(): string {
    return this.name;
  }

  toString(): string {
    return 'Not available';
  }
}

class NullSaiyanSingleton {
  private static instance: NullSaiyan;

  private constructor() {}

  static getInstance() {
    if (!NullSaiyanSingleton.instance) {
      NullSaiyanSingleton.instance = new NullSaiyan();
    }

    return NullSaiyanSingleton.instance;
  }
}

class SaiyanFactory {
  private saiyans = [
    { name: 'Son Goku', power: 1000 },
    { name: 'Son Gohan', power: 800 },
    { name: 'Vegeta', power: 950 },
  ];

  private findSaiyan(name: string): Saiyan | undefined {
    return this.saiyans.find((saiyan) => saiyan.name === name);
  }

  getSaiyan(name: string): AbstractSaiyan {
    const saiyan = this.findSaiyan(name);

    if (saiyan) return new RealSaiyan(saiyan);

    return NullSaiyanSingleton.getInstance();
  }
}

const saiyanFactory = new SaiyanFactory();

const saiyan1 = saiyanFactory.getSaiyan('Vegeta');
const saiyan2 = saiyanFactory.getSaiyan('Bob');
const saiyan3 = saiyanFactory.getSaiyan('Son Goku');
const saiyan4 = saiyanFactory.getSaiyan('Laura');

console.log(saiyan1.toString()); // Vegeta - 950
console.log(saiyan2.toString()); // Not available
console.log(saiyan3.toString()); // Son Goku - 1000
console.log(saiyan4.toString()); // Not available
```

## Resources

- [What is the Null Object Design Pattern?](https://justgokus.medium.com/what-is-the-null-object-design-pattern-d8bf2c5333b6)
- [Using NullObject pattern to avoid overfetching in DDD](https://acidtango.com/thelemoncrunch/using-null-object-pattern-to-avoid-over-fetching-in-ddd/)
- [Null Object Design Pattern](https://sourcemaking.com/design_patterns/null_object)
- [Design Patterns - Null Object Pattern](https://www.tutorialspoint.com/design_pattern/null_object_pattern.htm)
- [How to Refactor a Null Checking Condition With Object Composition in TypeScript](https://medium.com/cp-massive-programming/how-to-refactor-a-null-checking-condition-with-object-composition-in-typescript-6dd270e0096)
- [Introduce Null Object](https://refactoring.guru/introduce-null-object)
- [Design Patterns: Null Object](https://www.carloscaballero.io/design-patterns-null-object/)

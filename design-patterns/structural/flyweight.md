# Flyweight

## Intent

**Flyweight** is a structural design pattern that lets you fit more
objects into the available amount of RAM by sharing common
parts of state between multiple objects instead of keeping all
of the data in each object.

There are two important concepts in flyweight pattern: internal state
and external state.

- **internal state**: the shared part inside the flyweight object that
does not change with the change of the external environment.
- **external state**: the state that cannot be shared is the external
state that changes as the environment changes.

## Structure

1. The **Flyweight** pattern is merely an optimization.
2. The **Flyweight** class contains the portion of the original
object’s state that can be shared between multiple objects.
3. The **Context** class contains the extrinsic state, unique across
all original objects.
4. Usually, the behavior of the original object remains in the flyweight
class.
5. The **Client** calculates or stores the extrinsic state of flyweights.
6. The **Flyweight** Factory manages a pool of existing flyweights.

## Applicability

- Use the Flyweight pattern only when your program must support
a huge number of objects which barely fit into available
RAM.

## Implementation

1. Divide fields of a class that will become a flyweight into
two parts.
2. Leave the fields that represent the intrinsic state in the class,
but make sure they’re immutable.
3. Go over methods that use fields of the extrinsic state. For each
field used in the method, introduce a new parameter and use
it instead of the field.
4. Optionally, create a factory class to manage the pool of flyweights.
5. The client must store or calculate values of the extrinsic state
(context) to be able to call methods of flyweight objects.

## Example

```typescript
// Flyweight

class UPhoneFlyweight {
  constructor(
    readonly model: string,
    readonly screen: number,
    readonly memory: number,
  ) {}
}

// Context

class UPhone {
  constructor(
    readonly flyweight: UPhoneFlyweight,
    readonly serialNumber: number,
  ) {}
}

// Flyweight factory

class UPhoneFlyweightFactory {
  private uPhoneFlyweightMap: Map<string, UPhoneFlyweight> = new Map();

  public createKey(model: string, screen: number, memory: number) {
    return [model, screen, memory].join('.');
  }

  public get size() {
    return this.uPhoneFlyweightMap.size;
  }

  public get(model: string, screen: number, memory: number) {
    const key = this.createKey(model, screen, memory);

    if (this.uPhoneFlyweightMap.has(key)) {
      this.uPhoneFlyweightMap.get(key);
    }

    const uPhoneFlyweight = new UPhoneFlyweight(model, screen, memory);

    this.uPhoneFlyweightMap.set(key, uPhoneFlyweight);

    return uPhoneFlyweight;
  }
}

// Context factory

class UPhoneFactory {
  public static uPhoneFlyweightFactory = new UPhoneFlyweightFactory();

  public static get size() {
    return UPhoneFactory.uPhoneFlyweightFactory.size;
  }

  public get(model: string, screen: number, memory: number, serialNumber: number) {
    const uPhoneFlyweight = UPhoneFactory.uPhoneFlyweightFactory.get(model, screen, memory);

    const uPhone = new UPhone(uPhoneFlyweight, serialNumber);

    return uPhone;
  }
}

// Client

const uPhoneFactory = new UPhoneFactory();

const uPhones = Array.from({ length: 10_000 }).map((_, index) => {
  const memory = index % 2 === 0 ? 64 : 128;

  return uPhoneFactory.get('8U', 5.0, memory, index);
});

console.log('UPhoneFlyweight count:', UPhoneFactory.size); // 2

// From the above results, although we created 10,000 UPhone objects,
// we only created two UPhoneFlyweight objects.
```

## Resources

- [Flyweight](https://refactoring.guru/design-patterns/flyweight)
- [Design Patterns: Flyweight Pattern in TypeScript](https://levelup.gitconnected.com/design-patterns-flyweight-pattern-in-typescript-539066d57b42)
- [Flyweight Design Pattern](https://sbcode.net/typescript/flyweight/)

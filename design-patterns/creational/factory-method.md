# Factory Method

## Intent

**Factory Method** is a creational design pattern that provides
an interface for creating objects in a superclass, but allows
subclasses to alter the type of objects that will be created.

## Structure

1. The **Product** declares the interface, which is common to all
objects that can be produced by the creator and its subclasses.
2. **Concrete Products** are different implementations of the product
interface.
3. The **Creator** class declares the factory method that returns
new product objects.
4. **Concrete Creators** override the base factory method so it
returns a different type of product.

## Applicability

Use the factory method pattern when:

- you cannot anticipate the type of the object that will be created;
- you want to localize the creation of the objects;
- you want to provide an easy way of extending the type of objects
that can be created.

## Implementation

1. Make all products follow the same interface.
2. Add an empty factory method inside the creator class.
3. In the creator’s code find all references to product constructors.
One by one, replace them with calls to the factory method,
while extracting the product creation code into the factory
method.
4. Now, create a set of creator subclasses for each type of product
listed in the factory method.
5. If there are too many product types and it doesn’t make sense
to create subclasses for all of them, you can reuse the control
parameter from the base class in subclasses.
6. If, after all of the extractions, the base factory method has
become empty, you can make it abstract.

## Example

```typescript
enum OS {
  Android = 'android',
  IOS = 'ios',
}

class Platform {
  static get os(): OS {
    return OS.Android;
  }
}

// Product

abstract class Button {
  constructor(
    private label: string,
    private os: OS,
  ) {}

  toString() {
    return {
      label: this.label,
      os: this.os.toString(),
    };
  }
}

// Concrete products

class IOSButton extends Button {
  constructor(label: string) {
    super(label, OS.IOS);
  }
}

class AndroidButton extends Button {
  constructor(label: string) {
    super(label, OS.Android);
  }
}

// Creator

interface ButtonCreator {
  createButton(label: string): Button;
}

// Concrete creator

class ButtonFactory implements ButtonCreator {
  constructor(
    private os: OS,
  ) {}

  createButton(label: string): Button {
    return this.os === OS.Android
      ? new AndroidButton(label)
      : new IOSButton(label);
  }
}

const buttonFactory = new ButtonFactory(Platform.os);

const editButton = buttonFactory.createButton('Edit');
const deleteButton = buttonFactory.createButton('Delete');

console.log(editButton);
console.log(deleteButton);

// Output

// { label: "Edit", os: "android" }
// { label: "Delete", os: "android" }
```

## Resources

- [The Factory Method pattern in TypeScript](https://hackernoon.com/the-factory-method-pattern-in-typescript)
- [Factory Method](https://refactoring.guru/design-patterns/factory-method)
- [Factory Method pattern in TypeScript](https://www.jmalvarez.dev/posts/factory-method-typescript)
- [Factory Design Pattern](https://sbcode.net/typescript/factory/)
- [Factories and their implementation in TypeScript](https://wanago.io/2019/12/02/javascript-design-patterns-factories-typescript/)

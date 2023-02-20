# Prototype

## Intent

Prototype is a creational design pattern that lets you copy
existing objects without making your code dependent on
their classes.

## Structure

1. The **Prototype** interface declares the cloning methods.
2. The **Concrete Prototype** class implements the cloning method.
3. The **Client** can produce a copy of any object that follows the
prototype interface.

## Applicability

- Use the Prototype pattern when your code shouldn’t depend
on the concrete classes of objects that you need to copy.
- Use the pattern when you want to reduce the number of subclasses
that only differ in the way they initialize their respective
objects.

## Implementation

1. Create the prototype interface and declare the clone method
in it.
2. A prototype class must define the alternative constructor that
accepts an object of that class as an argument.
3. Optionally, create a centralized prototype registry to store a
catalog of frequently used prototypes.

## Examples

```typescript
// Prototype interface

interface WebsiteTemplate<T> {
  clone(): T;
  getDescription(): string;
}

// Concrete prototype

class Website implements WebsiteTemplate<Website> {
  constructor(
    private headerStyle: string,
    private bodyStyle: string,
    private footerStyle: string,
  ) {}

  clone(): Website {
    return new Website(
      this.headerStyle,
      this.bodyStyle,
      this.footerStyle,
    );
  }

  getDescription(): string {
    return JSON.stringify(this);
  }
}

// Prototype registry

class WebsiteCatalog {
  private catalog: Map<string, WebsiteTemplate<Website>> = new Map();

  add(name: string, website: WebsiteTemplate<Website>) {
    this.catalog.set(name, website);
  }

  get(name: string) {
    if (this.catalog.has(name)) {
      return this.catalog.get(name)?.clone();
    }

    return undefined;
  }
}

// Client

const websiteCatalog = new WebsiteCatalog();

const basicTemplate = new Website('basic', 'basic', 'basic');
const modernTemplate = new Website('clean and small', 'neutral colors', 'dark with subscribe button');

websiteCatalog.add('basic', basicTemplate);
websiteCatalog.add('modern', modernTemplate);

console.log(websiteCatalog.get('basic')?.getDescription());
// {"headerStyle":"basic","bodyStyle":"basic","footerStyle":"basic"}

console.log(websiteCatalog.get('modern')?.getDescription());
// {"headerStyle":"clean and small","bodyStyle":"neutral colors","footerStyle":"dark with subscribe button"}
```

## Resources

- [Prototype](https://refactoring.guru/design-patterns/prototype)
- [Prototype in TypeScript](https://www.devmaking.com/learn/design-patterns/prototype-pattern/typescript/)

# Decorator/Wrapper

## Intent

Decorator is a structural design pattern that lets you attach
new behaviors to objects by placing these objects inside
special wrapper objects that contain the behaviors.

## Structure

1. The **Component** declares the common interface for both wrappers
and wrapped objects.
2. **Concrete Component** is a class of objects being wrapped.
3. The **Base Decorator** class has a field for referencing a wrapped
object.
4. **Concrete Decorators** define extra behaviors that can be added
to components dynamically.
5. The **Client** can wrap components in multiple layers of decorators,
as long as it works with all objects via the component
interface.

## Applicability

- Use the Decorator pattern when you need to be able to assign
extra behaviors to objects at runtime without breaking the
code that uses these objects.
- Use the pattern when it’s awkward or not possible to extend
an object’s behavior using inheritance.

## Implementation

1. Figure out what methods are common to both the primary
component and the optional layers. Create a component interface
and declare those methods there.
2. Create a concrete component class and define the base behavior
in it.
3. Create a base decorator class. It should have a field for storing
a reference to a wrapped object.
4. Make sure all classes implement the component interface.
5. Create concrete decorators by extending them from the base
decorator.
6. The client code must be responsible for creating decorators
and composing them in the way the client needs.

## Example

```typescript
// Component

interface Logger {
  log(message: string): void;
}

// Concrete component

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(this.constructor.name.concat(':'), message);
  }
}

// Base decorator

abstract class LoggerDecorator implements Logger {
  constructor(
    protected wrappee: Logger,
  ) {}

  abstract log(message: string): void;
}

// Concrete decorators

class LowerCaseDecorator extends LoggerDecorator {
  log(message: string): void {
    this.wrappee.log(message.toLowerCase());
  }
}

class AsteriskDecorator extends LoggerDecorator {
  log(message: string): void {
    this.wrappee.log(`*** ${message} ***`);
  }
}

// Client

const logger = new ConsoleLogger();

const decoratedLogger = new AsteriskDecorator(new LowerCaseDecorator(logger));

logger.log('Hello Decorator'); // ConsoleLogger: Hello Decorator

decoratedLogger.log('Hello Decorator'); // ConsoleLogger: *** hello decorator ***

```

## Resources

- [Decorator](https://refactoring.guru/design-patterns/decorator)
- [Decorator pattern in TypeScript](https://www.jmalvarez.dev/posts/decorator-pattern-typescript)
- [Design Patterns: Decorator Pattern in TypeScript](https://levelup.gitconnected.com/design-patterns-decorator-pattern-in-typescript-ae899692ac05)
- [What is the Decorator Design Pattern?](https://betterprogramming.pub/decorator-c04fae63dfff)

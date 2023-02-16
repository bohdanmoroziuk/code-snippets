# Mediator

## Intent

**Mediator** is a behavioral design pattern that lets you reduce
chaotic dependencies between objects. The pattern restricts
direct communications between the objects and forces them
to collaborate only via a mediator object.

## Structure

1. **Components** are various classes that contain some business
logic.
2. The **Mediator** interface declares methods of communication
with components.
3. **Concrete Mediators** encapsulate relations between various
components.
4. Components must not be aware of other components.

## Applicability

- Use the Mediator pattern when it’s hard to change some of the
classes because they are tightly coupled to a bunch of other
classes.
- Use the pattern when you can’t reuse a component in a different
program because it’s too dependent on other components.
- Use the Mediator when you find yourself creating tons of component
subclasses just to reuse some basic behavior in various
contexts.

## Implementation

1. Identify a group of tightly coupled classes which would benefit
from being more independent.
2. Declare the mediator interface and describe the desired communication
protocol between mediators and various components.
3. Implement the concrete mediator class.
4. You can go even further and make the mediator responsible for
the creation and destruction of component objects.
5. Components should store a reference to the mediator object.
6. Change the components’ code so that they call the mediator’s
notification method instead of methods on other components.

## Example

```typescript
// Component

interface Component<T> {
  notify(message: T): void;
  receive(message: T): void;
}

// Mediator

interface Mediator<T> {
  notify(originator: Component<T>, message: T): void;
}

// Concrete component

class ConcreteComponent implements Component<string> {
  constructor(
    private name: string,
    private mediator: Mediator<string>,
  ) {}

  notify(message: string): void {
    console.log(`${this.name}: >>> Out >>> : ${message}`);

    this.mediator.notify(this, message);
  }

  receive(message: string): void {
    console.log(`${this.name}: <<< In <<< : ${message}`);
  }
}

// Concrete mediator

class ConcreteMediator implements Mediator<string> {
  private components: Set<Component<string>> = new Set();

  add(component: Component<string>) {
    this.components.add(component);
  }

  notify(originator: Component<string>, message: string): void {
    this.components.forEach((component) => {
      if (component !== originator) {
        component.receive(message);
      }
    });
  }
}

// Client

const mediator = new ConcreteMediator();

const componentA = new ConcreteComponent('ComponentA', mediator);
const componentB = new ConcreteComponent('ComponentB', mediator);
const componentC = new ConcreteComponent('ComponentC', mediator);

mediator.add(componentA);
mediator.add(componentB);
mediator.add(componentC);

componentA.notify('Data A');
componentB.notify('Data B');
componentC.notify('Data C');

// Output

// ComponentA: >>> Out >>> : Data A
// ComponentB: <<< In <<< : Data A 
// ComponentC: <<< In <<< : Data A 
// ComponentB: >>> Out >>> : Data B 
// ComponentA: <<< In <<< : Data B 
// ComponentC: <<< In <<< : Data B 
// ComponentC: >>> Out >>> : Data C 
// ComponentA: <<< In <<< : Data C 
// ComponentB: <<< In <<< : Data C
```

## Resources

- [Mediator](https://refactoring.guru/design-patterns/mediator)
- [Mediator Design Pattern](https://sbcode.net/typescript/mediator/)

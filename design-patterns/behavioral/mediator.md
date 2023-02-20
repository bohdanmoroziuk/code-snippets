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
interface Message {
  content: string;
}

// Component

interface Component {
  name: string;
  send(message: Message, receiver?: Component): void;
  receive(message: Message, sender: Component): void;
}

// Mediator

interface Mediator {
  notify(message: Message, sender: Component, receiver?: Component): void;
}

// Concrete component

class User implements Component {
  constructor(
    readonly name: string,
    private chatroom: Mediator,
  ) {}

  send(message: Message, receiver?: Component): void {
    this.chatroom.notify(message, this, receiver);
  }

  receive(message: Message, sender: Component): void {
    console.log(`${sender.name} to ${this.name}: ${message.content}`);
  }
}

// Concrete mediator

class Chatroom implements Mediator {
  private users: Set<Component> = new Set();

  public register(user: Component) {
    this.users.add(user);
  }

  notify(message: Message, sender: Component, receiver?: Component): void {
    if (receiver) {
      receiver.receive(message, sender);
    } else {
      this.users.forEach((user) => {
        if (user !== sender) {
          user.receive(message, sender);
        }
      });
    }
  }
}

// Client
const chatroom = new Chatroom();

const brad = new User('Brad', chatroom);
const jane = new User('Jane', chatroom);
const sarah = new User('Sarah', chatroom);

chatroom.register(brad);
chatroom.register(jane);
chatroom.register(sarah);

brad.send({ content: 'Hello Jane' }, jane);
sarah.send({ content: 'Hello Brad, you are the best dev!' }, brad);
jane.send({ content: 'Hello everyone!' });

// Output

// Brad to Jane: Hello Jane
// Sarah to Brad: Hello Brad, you are the best dev! 
// Jane to Brad: Hello everyone! 
// Jane to Sarah: Hello everyone!
```

## Resources

- [Mediator](https://refactoring.guru/design-patterns/mediator)
- [Mediator Design Pattern](https://sbcode.net/typescript/mediator/)
- [Mediator Design Pattern in JavaScript](https://javascript.plainenglish.io/mediator-design-pattern-in-javascript-83e20cc94664)

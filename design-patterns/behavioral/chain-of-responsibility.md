# Chain of Responsibility

## Intent

**Chain of Responsibility** is a behavioral design pattern that lets
you pass requests along a chain of handlers. Upon receiving a
request, each handler decides either to process the request or
to pass it to the next handler in the chain.

## Structure

1. The **Handler** declares the interface, common for all concrete
handlers.
2. The **Base Handler** is an optional class where you can put the
boilerplate code that’s common to all handler classes.
3. **Concrete Handlers** contain the actual code for processing
requests.
4. The **Client** may compose chains just once or compose them
dynamically, depending on the application’s logic.

## Applicability

- Use the Chain of Responsibility pattern when your program
is expected to process different kinds of requests in various
ways, but the exact types of requests and their sequences are
unknown beforehand.
- Use the pattern when it’s essential to execute several handlers
in a particular order.
- Use the CoR pattern when the set of handlers and their order
are supposed to change at runtime.

## Implementation

1. Declare the handler interface and describe the signature of a
method for handling requests.
2. To eliminate duplicate boilerplate code in concrete handlers,
it might be worth creating an abstract base handler class,
derived from the handler interface.
3. One by one create concrete handler subclasses and implement
their handling methods.
4. The client may either assemble chains on its own or receive
pre-built chains from other objects.
5. The client may trigger any handler in the chain, not just the
first one.

## Example

```typescript
// Handler

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request?: string): string | undefined;
}

// Base handler

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | undefined = undefined;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;

    return handler;
  }

  public handle(request?: string): string | undefined {
    if (!request) return undefined;

    if (!this.nextHandler) return undefined;

    return this.nextHandler.handle(request);
  }
}

// Concrete handlers

class MonkeyHandler extends AbstractHandler {
  public handle(request?: string): string | undefined {
    if (!request) return undefined;

    if (request !== 'Banana') return super.handle(request);

    return `Monkey: I'll eat the ${request}.`;
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request?: string): string | undefined {
    if (!request) return undefined;

    if (request !== 'Nut') return super.handle(request);

    return `Squirrel: I'll eat the ${request}.`;
  }
}

class DogHandler extends AbstractHandler {
  public handle(request?: string): string | undefined {
    if (!request) return undefined;

    if (request !== 'MeatBall') {
      return super.handle(request);
    }

    return `Dog: I'll eat the ${request}.`;
  }
}

// Client

function clientCode(handler: Handler) {
  const foods = ['Nut', 'Banana', 'Cup of coffee'];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = handler.handle(food);

    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  ${food} was left untouched.`);
    }
  }
}

const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey
  .setNext(squirrel)
  .setNext(dog);

console.log('Chain: Monkey > Squirrel > Dog\n');

clientCode(monkey);

// Output

// Chain: Monkey > Squirrel > Dog
// Client: Who wants a Nut?
//   Squirrel: I'll eat the Nut.
// Client: Who wants a Banana?
//   Monkey: I'll eat the Banana.
// Client: Who wants a Cup of coffee?
//   Cup of coffee was left untouched.
```

## Resources

- [Chain of Responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility)
- [Chain of Responsibility](https://designpatternsgame.com/patterns/chain_of_responsibility)
- [What is the Chain of Responsibility Design Pattern?](https://betterprogramming.pub/what-is-chain-of-responsibility-design-pattern-ff4d22abd124)
- [Design Patterns: Chain of Responsibility Pattern in JavaScript](https://levelup.gitconnected.com/design-patterns-chain-of-responsibility-pattern-in-javascript-80b3c44d0f4e)
- [Understanding the Chain of Responsibility Design Pattern](https://betterprogramming.pub/understanding-the-chain-of-responsibility-design-pattern-2f44cdff61e5)

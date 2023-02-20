# Observer

## Intent

**Observer** is a behavioral design pattern that lets you define a
subscription mechanism to notify multiple objects about any
events that happen to the object they’re observing.

## Structure

1. The **Publisher** issues events of interest to other objects.
2. When a new event happens, the publisher goes over the subscription
list and calls the notification method declared in the
subscriber interface on each subscriber object.
3. The **Subscriber** interface declares the notification interface.
4. **Concrete Subscribers** perform some actions in response to
notifications issued by the publisher.
5. Usually, subscribers need some contextual information to handle
the update correctly.
6. The **Client** creates publisher and subscriber objects separately
and then registers subscribers for publisher updates.

## Applicability

- Use the Observer pattern when changes to the state of one
object may require changing other objects, and the actual set
of objects is unknown beforehand or changes dynamically.
- Use the pattern when some objects in your app must observe
others, but only for a limited time or in specific cases.

## Implementation

1. Declare the subscriber interface.
2. Declare the publisher interface.
3. Decide where to put the actual subscription list and the implementation
of subscription methods.
4. Create concrete publisher classes.
5. Implement the update notification methods in concrete subscriber
classes.
6. The client must create all necessary subscribers and register
them with proper publishers.

## Examples

```typescript
// Subscriber/Observer/Listener interface

interface Subscriber<T> {
  update(payload: T): void;
}

// Publisher/Observable/Subject interface

interface Publisher<T> {
  subscribe(subscriber: Subscriber<T>): void;
  unsubscribe(subscriber: Subscriber<T>): void;
  notify(payload: T): void;
}

interface Video {
  name: string;
}

// Concrete subscriber

class Device implements Subscriber<Video> {
  constructor(
    private name: string,
  ) {}

  update(payload: Video): void {
    console.log(`New content published ${payload.name} on ${this.name}`);
  }
}

// Concrete publisher

class StreamingPlatform implements Publisher<Video> {
  private subscribers: Set<Subscriber<Video>> = new Set();

  subscribe(subscriber: Subscriber<Video>) {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber: Subscriber<Video>): void {
    this.subscribers.delete(subscriber);
  }

  notify(payload: Video): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.update(payload);
    });
  }
}

// Client

const netflix = new StreamingPlatform();

const pc = new Device('PC');
const tv = new Device('TV');
const tablet = new Device('Tablet');
const mobile = new Device('Mobile');

netflix.subscribe(pc);
netflix.subscribe(tv);
netflix.subscribe(tablet);
netflix.subscribe(mobile);

netflix.notify({ name: 'Ford v Ferrari' });

// Output:
// New content published Ford v Ferrari on PC
// New content published Ford v Ferrari on TV
// New content published Ford v Ferrari on Tablet
// New content published Ford v Ferrari on Mobile

netflix.unsubscribe(tablet);

netflix.notify({ name: 'Game of Thrones Season 8' });

// Output:
// New content published Game of Thrones Season 8 on PC
// New content published Game of Thrones Season 8 on TV
// New content published Game of Thrones Season 8 on Mobile
```

## Resources

- [Observer](https://refactoring.guru/design-patterns/observer)
- [Observer in TypeScript](https://www.devmaking.com/learn/design-patterns/observer-pattern/typescript/)
- [The Observer pattern with TypeScript](https://wanago.io/2020/01/20/javascript-design-patterns-observer-typescript/)
- [Observer Pattern](https://sbcode.net/typescript/observer/)
- [Explaining the Observer Pattern Using Netflix and TypeScript](https://betterprogramming.pub/explaining-the-observer-pattern-using-netflix-and-typescript-afbbff219c4d)

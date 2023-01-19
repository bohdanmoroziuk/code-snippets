# Proxy

## Intent

**Proxy** is a structural design pattern that lets you provide a
substitute or placeholder for another object. A proxy controls
access to the original object, allowing you to perform
something either before or after the request gets through to
the original object.

## Structure

1. The **Service Interface** declares the interface of the **Service**.
2. The **Service** is a class that provides some useful business logic.
3. The **Proxy** class has a reference field that points to a service
object.
4. The **Client** should work with both services and proxies via the
same interface.

## Applicability

- Lazy initialization (virtual proxy).
- Access control (protection proxy).
- Local execution of a remote service (remote proxy).
- Logging requests (logging proxy).
- Caching request results (caching proxy).
- Smart reference.

## Implementation

1. If there’s no pre-existing service interface, create one to make
proxy and service objects interchangeable.
2. Create the proxy class. It should have a field for storing a reference
to the service.
3. Implement the proxy methods according to their purposes.
4. Consider introducing a creation method that decides whether
the client gets a proxy or a real service.
5. Consider implementing lazy initialization for the service
object.

## Examples

- Example #1

```typescript
interface Logger {
  log(message: string): void;
}

export class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}

export class OnDemandLoggerProxy implements Logger {
  private service: Logger;

  private isEnabled: boolean;

  constructor(service: Logger, isEnabled: boolean) {
    this.service = service;
    this.isEnabled = isEnabled;
  }

  get enabled() {
    return this.isEnabled;
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  log(message: string): void {
    if (this.isEnabled) {
      this.service.log(message);
    }
  }
}

const consoleLogger = new ConsoleLogger();

const logger = new OnDemandLoggerProxy(
  consoleLogger,
  process.env.NODE_ENV !== 'production',
);

logger.log('It works');

logger.disable();

logger.log('It does not work');
```

## Resources

- [Proxy](https://refactoring.guru/design-patterns/proxy)
- [Design Patterns: Proxy Pattern in TypeScript](https://levelup.gitconnected.com/design-patterns-proxy-pattern-in-typescript-b4b66fef3a59)
- [Proxy Pattern](https://www.patterns.dev/posts/proxy-pattern/)
- [JavaScript Proxy](https://www.dofactory.com/javascript/design-patterns/proxy)
- [The Proxy Pattern in C#](https://exceptionnotfound.net/proxy-pattern-in-csharp/)

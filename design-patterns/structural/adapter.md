# Adapter

## Intent

![Adapter pattern](https://cdn.dribbble.com/users/3033693/screenshots/6968629/refactoring-patterns-adapter_1x.png)

**Adapter** is a structural design pattern that allows objects with
incompatible interfaces to collaborate.

This design pattern is also known as Wrapper Design Pattern.

## How it works

1. The adapter gets an interface, compatible with one of the existing objects.
2. Using this interface, the existing object can safely call the adapter’s methods.
3. Upon receiving a call, the adapter passes the request to the second object,
but in a format and order that the second object expects.

## Applicability

- When new components need to be integrated and work together with existing components in the application.
- Parts of the program are rewritten with an improved interface, but the old code still expects the original interface.
- When you have a third party API that there is a chance it changes.

## Structure

![Adapter pattern structure](https://www.dofactory.com/img/diagrams/net/adapter.png)

1. The *Client* is a class that contains the existing business logic of the program.
2. The *Client Interface* describes a protocol that other classes must follow to be able
to collaborate with the client code.
3. The *Service* is some useful class (usually 3rd-party or legacy). The client can’t use
this class directly because it has an incompatible interface.
4. The *Adapter* is a class that’s able to work with both the client and the service:
it implements the client interface, while wrapping the service object. The adapter receives
calls from the client via the adapter interface and translates them into calls to the wrapped
service object in a format it can understand.
5. The client code doesn’t get coupled to the concrete adapter class as long as it works with
the adapter via the client interface. Thanks to this, you can introduce new types of adapters
into the program without breaking the existing client code. This can be useful when the interface
of the service class gets changed or replaced: you can just create a new adapter class without
changing the client code.

## Examples

### JavaScript example

```javascript
// old interface

function Shipping() {
  this.request = function (zipStart, zipEnd, weight) {
    // ...
    return "$49.75";
  }
}

// new interface

function AdvancedShipping() {
  this.login = function (credentials) { /* ... */ };
  this.setStart = function (start) { /* ... */ };
  this.setDestination = function (destination) { /* ... */ };
  this.calculate = function (weight) { return "$39.50"; };
}

// adapter interface

function ShippingAdapter(credentials) {
  var shipping = new AdvancedShipping();

  shipping.login(credentials);

  return {
    request: function (zipStart, zipEnd, weight) {
      shipping.setStart(zipStart);
      shipping.setDestination(zipEnd);
      return shipping.calculate(weight);
    }
  };
}

function run() {
  var shipping = new Shipping();
  var credentials = { token: "30a8-6ee1" };
  var adapter = new ShippingAdapter(credentials);

  // original shipping object and interface

  var cost = shipping.request("78701", "10010", "2 lbs");
  console.log("Old cost: " + cost);

  // new shipping object with adapted interface

  cost = adapter.request("78701", "10010", "2 lbs");

  console.log("New cost: " + cost);
}
```

### TypeScript example

```typescript
interface Logger {
  info(message: string): Promise<void>;
}

class FileLogger implements Logger {
  public async info(message: string): Promise<void> {
    console.info(message);
    console.info('This Message was saved with FileLogger');
  }
}

class NotificationService {
  protected logger: Logger;
  
  constructor (logger: Logger) {    
    this.logger = logger;
  }

  public async send(message: string): Promise<void> {
    //... Implementation
    await this.logger.info(`Notification sended: ${message}`);
  }
}

(async () => {
  const fileLogger = new FileLogger();
  const notificationService = new NotificationService(fileLogger);
  await notificationService.send('My notification');
})();

interface CloudLogger {
  sendToServer(message: string, type: string): Promise<void>;
}

class AwsLogger implements CloudLogger {
  public async sendToServer(message: string, type: string): Promise<void> {
    console.info(message);
    console.info('This Message was saved with AwsLogger');
  }
}

class CloudLoggerAdapter implements Logger {
  protected cloudLogger: CloudLogger;

  constructor (cloudLogger: CloudLogger) {
    this.cloudLogger = cloudLogger;
  }

  public async info(message: string): Promise<void> {
    await this.cloudLogger.sendToServer(message, 'info');
  }
}

(async () => {
  const awsLogger = new AwsLogger();
  const cloudLoggerAdapter = new CloudLoggerAdapter(awsLogger);
  const notificationService = new NotificationService(cloudLoggerAdapter);
  await notificationService.send('My notification');
})();
```

### SecureLS example

```typescript
import SecureLS from 'secure-ls';

class StorageAdapter implements Storage {
  private adaptee: SecureLS;

  constructor(adaptee: SecureLS) {
    this.adaptee = adaptee;
  }

  private get keys() {
    return this.adaptee.getAllKeys();
  }

  get length() {
    return this.keys.length;
  }

  key(index: number): string | null {
    return this.adaptee.get(this.keys[index]);
  }

  getItem(key: string): string | null {
    return this.adaptee.get(key);
  }

  setItem(key: string, value: string): void {
    this.adaptee.set(key, value);
  }

  removeItem(key: string): void {
    this.adaptee.remove(key);
  }

  clear(): void {
    this.adaptee.clear();
  }
}

const secureStorage = new StorageAdapter(new SecureLS());

const storage = process.env.NODE_ENV === 'production'
  ? secureStorage
  : localStorage;
```

## Resources

- [Adapter](https://refactoring.guru/design-patterns/adapter)
- [JavaScript Adapter](https://www.dofactory.com/javascript/design-patterns/adapter)
- [Adapter Design Pattern Implementation in Typescript](https://levelup.gitconnected.com/adapter-design-pattern-implementation-in-typescript-a33f481b9aff)
- [Adapter Pattern - Design Patterns com Typescript](https://meneguite.com/2019/06/20/design-patterns-com-typescript-adapter/)
- [Adapter pattern](https://blog.logrocket.com/understanding-design-patterns-typescript-node-js/#adapter-pattern)
- [Design Patterns: Adapter Pattern in TypeScript](https://javascript.plainenglish.io/design-patterns-adapter-pattern-in-typescript-4b7ad3c1c234)

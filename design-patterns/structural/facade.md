# Facade

## Intent

Facade is a structural design pattern that provides a simplified
interface to a library, a framework, or any other complex set
of classes.

## Structure

1. The **Facade** provides convenient access to a particular part
of the subsystem’s functionality.
2. An **Additional Facade** class can be created to prevent polluting
a single facade with unrelated features that might make it yet
another complex structure.
3. The **Complex Subsystem** consists of dozens of various objects.
4. The **Client** uses the facade instead of calling the subsystem
objects directly.

## Applicability

- Use the Facade pattern when you need to have a limited but
straightforward interface to a complex subsystem.
- Use the Facade when you want to structure a subsystem into
layers.

## Implementation

1. Check whether it’s possible to provide a simpler interface than
what an existing subsystem already provides.
2. Declare and implement this interface in a new facade class.
3. To get the full benefit from the pattern, make all the client
code communicate with the subsystem only via the facade.
4. If the facade becomes too big, consider extracting part of its
behavior to a new, refined facade class.

## Examples

```typescript
// Complex subsystem

class CloudProviderService {
  public isLoggedIn(): boolean {
    // Checks if the user is logged in
  }

  public logIn(): Promise<void> {
    // Logs the user in
  }

  public convertFile(file: string): Promise<string> {
    // Converts the file to a format that the cloud provider accepts
  }

  public uploadFile(file: string): Promise<void> {
    // Uploads the file to the cloud provider
  }

  public getFileLink(file: string): Promise<string> {
    // Returns the link to the uploaded file
  }
}

// Facade

class CloudProviderFacade {
  private service: CloudProviderService;

  constructor() {
    this.service = new CloudProviderService();
  }

  public async uploadFile(file: string): Promise<string> {
    if (!this.service.isLoggedIn()) {
      await this.service.logIn();
    }

    const convertedFile = await this.service.convertFile(file);

    await this.service.uploadFile(convertedFile);

    const fileLink = await this.service.getFileLink(convertedFile);

    return fileLink;
  }
}

// Client

(async () => {
  const facade = new CloudProviderFacade();

  const fileLink = await facade.uploadFile('../file.txt');

  console.log('File link:', fileLink);
}());
```

## Resources

- [Facade](https://refactoring.guru/design-patterns/facade)
- [Facade pattern in TypeScript](https://www.jmalvarez.dev/posts/facade-pattern-typescript)
- [The fundamentals of the facade pattern](https://wanago.io/2019/12/09/javascript-design-patterns-facade-react-hooks/)
- [Design patterns - let's build the Facade](https://hello-js.com/articles/facade-design-pattern/)

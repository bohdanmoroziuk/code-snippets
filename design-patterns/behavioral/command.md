# Command

## Intent

**Command** is a behavioral design pattern that turns a request
into a stand-alone object that contains all information about
the request. This transformation lets you pass requests as a
method arguments, delay or queue a request’s execution, and
support undoable operations. Usually, this comes in the form
of an `execute()` method.

## Structure

Key components:

- **Command**: an interface that defines a parameter-free execute method.
- **Concrete Command**: a class that implements the command interface,
and stores the state needed to invoke.
- **Invoker**: stores a command and carries out the request.
- **Receiver**: the class that is acted upon by the concrete command.

Because the state needed for the command is self contained, it is
popularly used for implementing `undo()` and `redo()` functionality in programs!

## Applicability

- Use the Command pattern when you want to parametrize
objects with operations.
- The Command pattern can turn a specific method call into a
stand-alone object. This change opens up a lot of interesting
uses: you can pass commands as method arguments, store
them inside other objects, switch linked commands at runtime,
etc.
- Use the Command pattern when you want to queue operations,
schedule their execution, or execute them remotely.
- As with any other object, a command can be serialized, which
means converting it to a string that can be easily written to a
file or a database. Later, the string can be restored as the initial
command object.
- Use the Command pattern when you want to implement
reversible operations.
- Although there are many ways to implement undo/redo, the
Command pattern is perhaps the most popular of all.
To be able to revert operations, you need to implement the history
of performed operations. The command history is a stack
that contains all executed command objects along with related
backups of the application’s state.

## Implementation

1. Declare the command interface with a single execution
method.
2. Start extracting requests into concrete command classes that
implement the command interface. Each class must have a set
of fields for storing the request arguments along with a reference
to the actual receiver object. All these values must be
initialized via the command’s constructor.
3. Identify classes that will act as senders. Add the fields for storing
commands into these classes. Senders should communicate
with their commands only via the command interface.
Senders usually don’t create command objects on their own,
but rather get them from the client code.
4. Change the senders so they execute the command instead of
sending a request to the receiver directly.
5. The client should initialize objects in the following order:
    - Create receivers.
    - Create commands, and associate them with receivers if
needed.
    - Create senders, and associate them with specific
commands.

## Examples

- Example #1

```typescript
// the Television class
export class Television { 
  state: boolean = false;

  on() {
    this.state = true;
  }

  off() {
    this.state = false;
  }
}

// the Command interface
interface Command { 
  execute(): any;
  undo(): any;
}

// the TelevisionOnCommand is a concrete implementation of the Command interface
class TelevisionOnCommand implements Command {
  television: Television;

  constructor(television: Television) {
    this.television = television;
  }

  execute() {
    this.television.on();
  }

  undo() {
    this.television.off();
  }
}

// the TelevisionOffCommand is a concrete implementation of the Command interface
class TelevisionOffCommand implements Command {
  television: Television;

  constructor(television: Television) {
    this.television = television;
  }

  execute() {
    this.television.off();
  }

  undo() {
    this.television.on();
  }
}

// the Remote in this case is the caller
class Remote {
  onCommand: Command;
  offCommand: Command;

  setCommand(onCommand, offCommand) {
    this.onCommand = onCommand;
    this.offCommand = offCommand;
  }

  onButtonClick() {
    this.onCommand.execute();
  }

  offButtonClick() {
    this.offCommand.execute()
  }
}

let television = new Television();
let televisionOnCommand = new TelevisionOnCommand(television);
let televisionOffCommand = new TelevisionOffCommand(television);
let remote = new Remote();

remote.setCommand(televisionOnCommand, televisionOffCommand);

console.log('state of television before remote is used:', television.state);
remote.onButtonClick();
console.log('state of television after remote is used:', television.state);
```

- Example #2

```typescript
interface Command {
  readonly name: string;
  execute(args: unknown): void;
}

class OpenUrlCommand implements Command {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  execute(args: unknown): void {
    console.log('open url', args);
  }
}

class SendMessage implements Command {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  execute(args: unknown): void {
    console.log('send message', args);
  }
}

class CommandManager {
  private commands: Record<Command['name'], Command> = {};

  register(command: Command) {
    this.commands[command.name] = command;
  }

  execute(name: string, args: unknown) {
    this.commands?.[name]?.execute(args);
  }
}

class UIEventManager {
  constructor(
    private commandManager: CommandManager,
  ) {}

  handleAction(name: string, args: unknown) {
    this.commandManager.execute(name, args);
  }
}

const commandManager = new CommandManager();

commandManager.register(new OpenUrlCommand('open url'));
commandManager.register(new SendMessage('send message'));

const uiEventHandler = new UIEventManager(commandManager);

uiEventHandler.handleAction('open url', 'https://medium.com');
uiEventHandler.handleAction('send message', 'Hello there!');
```

## Resources

- [JavaScript Command](https://www.dofactory.com/javascript/design-patterns/command)
- [How to implement a command pattern in Typescript](https://www.educative.io/answers/how-to-implement-a-command-pattern-in-typescript)
- [Command in TypeScript](https://www.devmaking.com/learn/design-patterns/command-pattern/typescript/)
- [Command Pattern in Typescript](https://www.thetechplatform.com/post/command-pattern-in-typescript)
- [Angular Architecture: How to use Command Pattern to manage large amount of context menu actions](https://dev.to/humberd/context-menu-actions-at-scale-command-pattern-in-a-real-life-scenario-9o0)
- [Design Patterns: Command Pattern in TypeScript](https://levelup.gitconnected.com/design-patterns-command-pattern-in-typescript-10b3162e3bee)

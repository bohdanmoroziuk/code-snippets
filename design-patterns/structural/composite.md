# Composite

## Intent

**Composite** is a structural design pattern that lets you compose
objects into tree structures and then work with these
structures as if they were individual objects.

## Structure

1. The **Component** interface describes operations that are common
to both simple and complex elements of the tree.
2. The **Leaf** is a basic element of a tree that doesn’t have sub-elements.
3. The **Container** (aka *composite*) is an element that has sub-elements:
leaves or other containers.
4. The **Client** works with all elements through the component
interface.

## Applicability

- Use the Composite pattern when you have to implement a
tree-like object structure.
- Use the pattern when you want the client code to treat both
simple and complex elements uniformly.

## Implementation

1. Make sure that the core model of your app can be represented
as a tree structure.
2. Declare the component interface with a list of methods that
make sense for both simple and complex components.
3. Create a leaf class to represent simple elements.
4. Create a container class to represent complex elements.
5. Finally, define the methods for adding and removal of child
elements in the container.

## Example

```typescript
enum ComponentType {
  FILE = 'file',
  DIRECTORY = 'directory',
}

// Component

abstract class Component {
  constructor(
    readonly name: string,
    private type: ComponentType,
  ) {}

  public abstract ls(indent: number): void;

  public tab(indent = 0) {
    return ''.padStart(indent, ' ');
  }
}

// Leaf

class File extends Component {
  private ext: string;

  constructor(name: string, ext: string) {
    super(name, ComponentType.FILE);

    this.ext = ext;
  }

  public ls(indent = 0): void {
    console.log(`${this.tab(indent)}${this.name}.${this.ext}`);
  }
}

// Container

class Directory extends Component {
  private components: Component[] = []

  constructor(name: string) {
    super(name, ComponentType.DIRECTORY);
  }

  public ls(indent = 0): void {
    console.log(`${this.tab(indent)}${this.name}/`);

    this.components.forEach((component) => (
      component.ls(indent + 1)
    ));
  }

  add(component: Component) {
    this.components.push(component);
  }

  remove(component: Component) {
    const index = this.components.indexOf(component);

    if (index > -1) {
      this.components.splice(index, 1);
    }
  }
}

// Client

const root = new Directory('usr');

const homeDir = new Directory('home');

homeDir.add(new File('howToCode', 'pdf'));
homeDir.add(new File('ThingsToDo', 'txt'));
homeDir.add(new File('grandCanyon', 'png'));

root.add(homeDir);

const projectDir = new Directory('codeProjects');

const devmakingDir = new Directory('devmaking');

devmakingDir.add(new File('index', 'html'));

const ticTacToeDir = new Directory('AI_tic-tac-toe');

ticTacToeDir.add(new File('app', 'py'));

projectDir.add(devmakingDir);
projectDir.add(ticTacToeDir);

root.add(projectDir);

root.ls();

// Output

// usr/
//  home/
//   howToCode.pdf
//   ThingsToDo.txt
//   grandCanyon.png
//  codeProjects/
//   devmaking/
//    index.html
//   AI_tic-tac-toe/
//    app.py
```

## Resources

- [Composite](https://refactoring.guru/design-patterns/composite)
- [Composite Design Pattern](https://sbcode.net/typescript/composite/)
- [Composite pattern in TypeScript](https://www.jmalvarez.dev/posts/composite-pattern-typescript)
- [Composite in TypeScript](https://www.devmaking.com/learn/design-patterns/composite-pattern/typescript/)
- [Easy patterns: Composite](https://itnext.io/easy-patterns-composite-8b28aa1f158)
- [What is the Composite Design Pattern?](https://medium.com/swlh/composite-908878748d0e)

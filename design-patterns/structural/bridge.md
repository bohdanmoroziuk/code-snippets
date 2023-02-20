# Bridge

## Intent

**Bridge** is a structural design pattern that lets you split
a large class or a set of closely related classes into two
separate hierarchies—abstraction and implementation—which can
be developed independently of each other.

## Structure

1. The **Abstraction** provides high-level control logic.
2. The **Implementation** declares the interface that’s common for
all concrete implementations.
3. **Concrete Implementations** contain platform-specific code.
4. **Refined Abstractions** provide variants of control logic.
5. Usually, the **Client** is only interested in working with the
abstraction.

## Applicability

- Use the Bridge pattern when you want to divide and organize
a monolithic class that has several variants of some functionality.
- Use the pattern when you need to extend a class in several
orthogonal (independent) dimensions.
- Use the Bridge if you need to be able to switch implementations
at runtime.

## Implementation

1. Identify the orthogonal dimensions in your classes.
2. See what operations the client needs and define them in the
base abstraction class.
3. Determine the operations available on all platforms.
4. For all platforms in your domain create concrete implementation
classes, but make sure they all follow the implementation
interface.
5. Inside the abstraction class, add a reference field for the
implementation type.
6. If you have several variants of high-level logic, create refined
abstractions for each variant by extending the base abstraction
class.
7. The client code should pass an implementation object to the
abstraction’s constructor to associate one with the other.

## Examples

- Example #1

```typescript
// Theme Implementation:
interface Theme {
  background(): string;
  foreground(): string;
  lineColor(): string;
  fontColor(): string;
  altFontColor(): string;
}

// UIObject Abstraction:
abstract class UIObject {
  // Implementation reference:
  theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  // Draw the UI Object:
  public abstract draw(): void;
}

// Concrete Implementations:
// Light and Dark Themes:
class LightMode implements Theme {
  background(): string { return "#ffffff"; }
  foreground(): string { return "#aaaaaa"; }
  lineColor(): string { return "#0c60cd"; }
  fontColor(): string { return "#222222"; }
  altFontColor(): string { return "#000000"; }
}

class DarkMode implements Theme {
  background(): string { return "#111111"; }
  foreground(): string { return "#2d2d2d"; }
  lineColor(): string { return "#0c60cd"; }
  fontColor(): string { return "#dfdfdf"; }
  altFontColor(): string { return "#efefef"; }
}

// Refined Abstractions
class UIButton extends UIObject {
  constructor(theme: Theme) {
    super(theme);
  }

  public draw() {
    console.log("Drawing a button on the screen.");
    console.log("\tText Color: " + this.theme.fontColor());
    console.log("\tButton Color: " + this.theme.background());
    console.log("\tHighlight Text Color: " + this.theme.altFontColor());
  }
}

class UIGraph extends UIObject {
  constructor(theme: Theme) {
    super(theme);
  }

  public draw() {
    console.log("Drawing a graph on the screen.");
    console.log("\tMain Text Color: " + this.theme.fontColor());
    console.log("\tLine Color: " + this.theme.lineColor());
    console.log("\tAxis Text Color: " + this.theme.altFontColor());
    console.log("\tGraph Background Color: " + this.theme.foreground());
  }
}

// Client: 
class BridgeSolution {
  public static execute() {
    // Create the themes:
    const light = new LightMode();
    const dark = new DarkMode();

    // Create the UI Objects:
    const button = new UIButton(light);
    const graph = new UIGraph(dark);

    // Draw the objects:
    button.draw();
    graph.draw();
  }
}

// Run the demo code:
BridgeSolution.execute();

// Output:
/*
  Drawing a button on the screen.
    Text Color: #222222
    Button Color: #ffffff
    Highlight Text Color: #000000
       
  Drawing a graph on the screen.
    Main Text Color: #dfdfdf
    Line Color: #0c60cd
    Axis Text Color: #efefef
    Graph Background Color: #2d2d2d
*/
```

## Resources

- [Bridge](https://refactoring.guru/design-patterns/bridge)
- [Bridge in TypeScript](https://www.devmaking.com/learn/design-patterns/bridge-pattern/typescript/)
- [JavaScript Bridge](https://www.dofactory.com/javascript/design-patterns/bridge)
- [Bridge pattern in TypeScript](https://www.jmalvarez.dev/posts/bridge-pattern-typescript)
- [The Bridge Pattern - Design Patterns meet the Frontend](https://dev.to/coly010/the-bridge-pattern-design-patterns-meet-the-frontend-46fc)

# Memento

## Intent

**Memento** is a behavioral design pattern that lets you save and
restore the previous state of an object without revealing the
details of its implementation.

## Structure

![Memento pattern structure](https://sbcode.net/typescript/img/memento_concept.svg)

1. The **Originator** class can produce snapshots of its own state, as
well as restore its state from snapshots when needed.
2. The **Memento** is a value object that acts as a snapshot of the
originator’s state.
3. The **Caretaker** knows not only “when” and “why” to capture the
originator’s state, but also when the state should be restored.

## Applicability

- Use the Memento pattern when you want to produce snapshots
of the object’s state to be able to restore a previous state
of the object.
- Use the pattern when direct access to the object’s fields/getters/
setters violates its encapsulation.

## Implementation

1. Determine what class will play the role of the originator.
2. Create the memento class.
3. Make the memento class immutable.
4. If your programming language supports nested classes, nest
the memento inside the originator. If not, extract a blank interface
from the memento class and make all other objects use
it to refer to the memento.
5. Add a method for producing mementos to the originator class.
6. Add a method for restoring the originator’s state to its class.
7. The caretaker, whether it represents a command object, a history,
or something entirely different, should know when to
request new mementos from the originator, how to store them
and when to restore the originator with a particular memento.
8. The link between caretakers and originators may be moved
into the memento class.

## Examples

```typescript
interface Memento<TState> {
  getState(): TState;
}

interface Originator<TState> {
  getMemento(): Memento<TState>;
  setMemento(memento: Memento<TState>): void;
}

interface CareTaker {
  save(): void;
  restore(index: number): void;
}

interface GameCharacterState {
  score: number;
  level: number;
}

class GameCharacterMemento implements Memento<GameCharacterState> {
  constructor(
    private state: GameCharacterState,
  ) {}

  getState(): GameCharacterState {
    return this.state;
  }
}

class GameCharacter implements Originator<GameCharacterState> {
  constructor(
    private state: GameCharacterState,
  ) {}

  get status() {
    return `Level: ${this.state.level}, score: ${this.state.score}`;
  }

  registerKill() {
    this.state.score += 100;
  }

  progressToNextLevel() {
    this.state.level += 1;
  }

  getMemento(): Memento<GameCharacterState> {
    return new GameCharacterMemento({ ...this.state });
  }

  setMemento(memento: Memento<GameCharacterState>): void {
    this.state = { ...memento.getState() };
  }
}

class GameCharacterCareTaker<TState> implements CareTaker {
  private originator: Originator<TState>;

  private mementos: Memento<TState>[];

  constructor(originator: Originator<TState>) {
    this.originator = originator;
    this.mementos = [];
  }

  save(): void {
    this.mementos.push(this.originator.getMemento());
  }

  restore(index: number): void {
    const memento = this.mementos[index];

    if (memento) {
      this.originator.setMemento(memento);
    }
  }
}

const originator = new GameCharacter({
  level: 1,
  score: 0,
});

const careTaker = new GameCharacterCareTaker(originator);

careTaker.save();

console.log(originator.status); // Level: 1, score: 0

originator.registerKill();
originator.progressToNextLevel();

careTaker.save();

console.log(originator.status); // Level: 2, score: 100

originator.registerKill();
originator.registerKill();
originator.progressToNextLevel();

careTaker.save();

console.log(originator.status); // Level: 3, score: 300

originator.registerKill();
originator.registerKill();
originator.registerKill();
originator.registerKill();
originator.progressToNextLevel();

careTaker.save();

console.log(originator.status); // Level: 4, score: 700

careTaker.restore(1);

console.log(originator.status); // Level: 2, score: 100
```

## Resources

- [Memento](https://refactoring.guru/design-patterns/memento)
- [JavaScript Memento](https://www.dofactory.com/javascript/design-patterns/memento)
- [Memento Design Pattern](https://sbcode.net/typescript/memento/)
- [Memento in TypeScript](https://refactoring.guru/design-patterns/memento/typescript/example)

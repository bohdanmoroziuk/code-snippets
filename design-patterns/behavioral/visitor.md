# Visitor

## Intent

Visitor is a behavioral design pattern that lets you separate
algorithms from the objects on which they operate.

## Structure

1. The **Visitor** interface declares a set of visiting methods that
can take concrete elements of an object structure as arguments.
2. Each **Concrete Visitor** implements several versions of the same
behaviors, tailored for different concrete element classes.
3. The **Element** interface declares a method for “accepting” visitors.
4. Each **Concrete Element** must implement the acceptance
method.
5. The **Client** usually represents a collection or some other complex
object.

## Applicability

- Use the Visitor when you need to perform an operation on
all elements of a complex object structure.
- Use the Visitor to clean up the business logic of auxiliary
behaviors.
- Use the pattern when a behavior makes sense only in some
classes of a class hierarchy, but not in others.

## Implementation

1. Declare the visitor interface with a set of “visiting” methods,
one per each concrete element class that exists in the
program.
2. Declare the element interface.
3. Implement the acceptance methods in all concrete element
classes.
4. The element classes should only work with visitors via the visitor
interface.
5. For each behavior that can’t be implemented inside the element
hierarchy, create a new concrete visitor class and implement
all of the visiting methods.
6. The client must create visitor objects and pass them into elements
via “acceptance” methods.

## Examples

```typescript
// Element interface

interface Visitable {
  accept(visitor: Visitor): void;
}

// Visitor interface

interface Visitor {
  visitUniversity(university: University): void;
  visitStudent(student: Student): void;
}

class DateUtils {
  static readonly MS_PER_DAY = 1000 * 3600 * 24;

  static diffInDays(start: Date, end: Date) {
    return Math.ceil((end.getTime() - start.getTime()) / DateUtils.MS_PER_DAY);
  }
}

class SickLeave {
  constructor(
    private start: Date,
    private end: Date,
  ) {}

  getStart() {
    return this.start;
  }

  getEnd() {
    return this.end;
  }

  getDays() {
    return DateUtils.diffInDays(this.start, this.end);
  }
}

// Concrete elements

class Student implements Visitable {
  constructor(
    private name: string,
    private sickLeaves: SickLeave[],
  ) {}

  addSickLeave(sickLeave: SickLeave) {
    this.sickLeaves.push(sickLeave);
  }

  getName() {
    return this.name;
  }

  getSickLeaves() {
    return this.sickLeaves;
  }

  accept(visitor: Visitor) {
    visitor.visitStudent(this);
  }
}

class University implements Visitable {
  constructor(
    private name: string,
    private students: Student[],
  ) {}

  getName() {
    return this.name;
  }

  getStudents() {
    return this.students;
  }

  accept(visitor: Visitor) {
    visitor.visitUniversity(this);
  }
}

// Concrete visitor

class SickLeaveReport implements Visitor {
  private rows: string[] = [];

  private content = '';

  visitStudent(student: Student) {
    const missedDays = student
      .getSickLeaves()
      .map((sickLeave) => sickLeave.getDays())
      .reduce((a, b) => a + b, 0);

    const row = `Student ${student.getName()} missed ${missedDays} days`;

    this.rows.push(row);
  }

  visitUniversity(university: University) {
    const row = `Generating sick leave report for ${university.getName()}`;

    this.rows.push(row);

    university.getStudents().forEach((student) => this.visitStudent(student));
  }

  getContent() {
    return this.rows.join('\n');
  }
}

// Client

const john = new Student('John', [
  new SickLeave(new Date('2019-10-01'), new Date('2019-10-21')),
  new SickLeave(new Date('2019-11-02'), new Date('2019-11-10')),
]);

const jan = new Student('Jan', [
  new SickLeave(new Date('2019-11-01'), new Date('2019-11-15')),
]);

const ann = new Student('Ann', []);

const university = new University('University', [john, jan, ann]);

const sickLeaveReport = new SickLeaveReport();

university.accept(sickLeaveReport);

console.log(sickLeaveReport.getContent());

// Output: 

// Generating sick leave report for University
// Student John missed 28 days
// Student Jan missed 14 days
// Student Ann missed 0 days
```

## Resources

- [Visitor](https://refactoring.guru/design-patterns/visitor)
- [Visitor Pattern Example](https://www.mikeallanson.com/notes/visitor-pattern/)
- [Visitor pattern in TypeScript](https://www.kirillvasiltsov.com/writing/visitor-pattern-typescript/)
- [JavaScript Visitor](https://www.dofactory.com/javascript/design-patterns/visitor)
- [What is the Visitor Design Pattern?](https://betterprogramming.pub/what-is-visitor-design-pattern-8451fb75876)
- [Visitor Design Pattern](https://sbcode.net/typescript/visitor/)

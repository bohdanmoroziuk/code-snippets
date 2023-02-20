# Template Method

## Intent

**Template Method** is a behavioral design pattern that defines
the skeleton of an algorithm in the superclass but lets
subclasses override specific steps of the algorithm without
changing its structure.

## Structure

1. The **Abstract Class** declares methods that act as steps of an
algorithm, as well as the actual template method which calls
these methods in a specific order.
2. **Concrete Classes** can override all of the steps, but not the template
method itself.

## Applicability

- Use the Template Method pattern when you want to let clients
extend only particular steps of an algorithm, but not the whole
algorithm or its structure.
- Use the pattern when you have several classes that contain
almost identical algorithms with some minor differences.

## Implementation

1. Create the abstract base class and declare the template
method and a set of abstract methods representing the algorithm’s
steps.
2. It’s okay if all the steps end up being abstract.
3. Think of adding hooks between the crucial steps of the
algorithm.
4. For each variation of the algorithm, create a new concrete subclass.

## Example

```typescript
import * as fs from 'fs';
import * as path from 'path';

import { csvParse, DSVRowArray } from 'd3-dsv';
import { marked } from 'marked';

// Abstract class

abstract class FileParser<Data> {
  // Template method 

  handle(filePath: string): Data {
    const content = this.readFile(filePath);
    const data = this.parseFile(content);

    return data;
  }

  readFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }

    return '';
  }

  abstract parseFile(fileContent: string): Data;
}

// Concrete classes

class CsvFileParser extends FileParser<DSVRowArray> {
  parseFile(fileContent: string): DSVRowArray {
    return csvParse(fileContent);
  }
}

class MarkdownFileParser extends FileParser<string> {
  parseFile(fileContent: string): string {
    return marked.parse(fileContent);
  }
}

// Client

const csvFileParser = new CsvFileParser();

console.dir(csvFileParser.handle(path.join(__dirname, 'users.csv')));

// Output:

// [
//   { id: '1', Name: 'Bytefer' },
//   { id: '2', Name: 'Kakuqo' },
//   columns: [ 'id', 'Name' ]
// ]

const markdownFileParser = new MarkdownFileParser();

console.log(markdownFileParser.handle(path.join(__dirname, 'users.md')));

// Output:

// <h3 id="users">Users</h3>
// <ul>
// <li>Bytefer</li>
// <li>Kakuqo</li>
// </ul>
```

## Resources

- [Template Method](https://refactoring.guru/design-patterns/template-method)
- [Design Patterns: Template Method Pattern in TypeScript](https://javascript.plainenglish.io/design-patterns-template-method-pattern-in-typescript-ce0c8b158985)
- [Template Method Design Pattern](https://sbcode.net/typescript/template/)

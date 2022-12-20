# Single Responsibility Principle

Means that a module should have only one reason to change.
All code that changes for this reason should be collected in this module.

The main tool of the principle is to unite those parts that change for one reason,
and separate those that change in different ways.

Single Responsibility Principle:

- helps to break down and decompose tasks one per module;
- reduces the number of modules that need to be changed when requirements change;
- limits the impact of changes, helping to control the complexity of the system.

## Example

```typescript
interface Report {
  content: string;
  date: Date;
  size: number;   
}

enum ReportType {
  Html,
  Txt,
}

interface ReportFormatter {
  format(data: Report): string;
}

class ReportHtmlFormatter implements ReportFormatter {
  format(data: Report): string {
    return 'html string';
  }
}

class ReportTxtFormatter implements ReportFormatter {
  format(data: Report): string {
    return 'txt string';
  }
}

class ReportFormatSelector {
  private static formatters = {
    [ReportType.Html]: ReportHtmlFormatter,
    [ReportType.Txt]: ReportTxtFormatter,
  };

  static selectFor(reportType: ReportType) {
    return new ReportFormatSelector.formatters[reportType]();
  }
}

class ReportExporter {
  private name: string;
  private data: Report;

  constructor(name: string, data: Report) {
    this.name = name;
    this.data = data;
  }

  export(reportType: ReportType) {
    const formatter = ReportFormatSelector.selectFor(reportType);

    return formatter.format(this.data);
  }
}
```

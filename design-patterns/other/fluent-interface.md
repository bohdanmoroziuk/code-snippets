# Fluent interface

The Fluent Interface is often referred to as Method Chaining,Fluent API or
jQuery Style. A fluent interface is an object-oriented API whose design
relies extensively on method chaining. Its goal is to increase code
legibility by creating a domain-specific language (DSL). The term was coined
in 2005 by Eric Evans and Martin Fowler.

## Example

```typescript
class Calculator {
  private result: number;

  constructor(initialValue: number) {
    this.result = initialValue;
  }

  add(value: number) {
    this.result += value;

    return this;
  }

  subtract(value: number) {
    this.result -= value;

    return this;
  }

  multiply(value: number) {
    this.result *= value;

    return this;
  }

  divide(value: number) {
    this.result /= value;

    return this;
  }

  equal() {
    return this.result;
  }
}

new Calculator(0)
    .add(10)
    .subtract(2)
    .multiply(3)
    .divide(2)
    .equal();

// => 12
```

## Resources

- [Fluent Interfaces in JavaScript](https://www.velocidadescape.com/js/fluent-interface-javascript/)

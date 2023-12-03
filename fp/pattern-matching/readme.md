# Pattern Matching

Pattern matching is a type of conditional branching, which is a programming
mechanism that allows us to run specific pieces of code based on the evaluation
of conditions. It will enable us to specify a situation and execute different
parts of code based on whether the state is true or false.

**Pattern matching is checking if a given value has the shape defined by a
pattern.** It involves comparing a value against a pattern, and, if a match is
found, it takes some action, such as returning a value or executing a block of
code.

## Example

```typescript
interface PaymentPattern<T>{
  CreditCard: (creditCard: CreditCardPayment) => T;
  Cash: (cash: CashPayment) => T;
}

interface PaymentMatcher {
  match<T>(pattern: PaymentPattern<T>): T;
}

abstract class Payment implements PaymentMatcher {
  constructor(public readonly amount: number) {}

  abstract match<T>(pattern: PaymentPattern<T>): T;
}

class CreditCardPayment extends Payment {
  constructor(
    amount: number,
    public readonly fee: number
  ) {
    super(amount);
  }

  match<T>(pattern: PaymentPattern<T>): T {
    return pattern.CreditCard(this);
  }
}

class CashPayment extends Payment {
  constructor(
    amount: number,
    public readonly discount: number
  ) {
    super(amount);
  }

  match<T>(pattern: PaymentPattern<T>): T {
    return pattern.Cash(this);
  }
}

const calculatePaymentAmount = (payment: Payment) => {
  return payment.match({
    CreditCard: (creditCard) => creditCard.amount + (creditCard.amount * creditCard.fee),
    Cash: (cash) => cash.amount - cash.discount,
  });
}

const creditCardPayment = new CreditCardPayment(100, 0.02);

const cashPayment = new CashPayment(100, 2);

console.log({
  creditCardAmount: calculatePaymentAmount(creditCardPayment),
  cashAmount: calculatePaymentAmount(cashPayment),
});

// { 'creditCardAmount': 102, 'cashAmount': 98 } 
```

## Example with ts-pattern

```typescript
import { match } from 'ts-pattern';

type Result = {
  type: 'idle' | 'loading' | 'done' | 'error' | 'invalid';
};

const result: Result = { type: 'error' };

match(result)
  .with({ type: 'idle' }, () => console.log('idle'))
  .with({ type: 'loading' }, () => console.log('loading'))
  .with({ type: 'done' }, () => console.log('done'))
  .with({ type: 'error' }, () => console.log('error'))
  .with({ type: 'invalid' }, () => console.log('invalid'))
  .exhaustive();

// 'error'
```

## Libraries

- [ts-pattern](https://github.com/gvergnaud/ts-pattern)

## Conclusion

Pattern matching can improve our code and make it easier to maintain and debug.
It is a valuable code pattern we can use daily to make our jobs easier and
create better applications.

## Sources

- [Pattern Matching with TypeScript](https://www.telerik.com/blogs/pattern-matching-typescript)
- [Simplifying TypeScript with Pattern Matching: An Introduction to TS-Pattern](https://waresix.engineering/simplifying-typescript-with-pattern-matching-an-introduction-to-ts-pattern-39318fe1e67a)
- [Produce more declarative TypeScript code with pattern matching](https://engineering.brigad.co/produce-more-declarative-typescript-code-with-pattern-matching-26a58c71f986)
- [Pattern Matching with TypeScript](https://alabor.me/2017/07/05/pattern-matching-with-typescript.html)
- [Bringing Pattern Matching to TypeScript 🎨 Introducing TS-Pattern](https://dev.to/gvergnaud/bringing-pattern-matching-to-typescript-introducing-ts-pattern-v3-0-o1k)
- [Pattern Matching Custom Data Types in Typescript](https://blog.parametricstudios.com/posts/pattern-matching-custom-data-types/)
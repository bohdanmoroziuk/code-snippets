# Interface Segregation Principle

The banana-jungle problem is one of those things people hate about OOP.
Its essence in simple words is when, during inheritance, a child class receives, along with the desired
a bunch of unused and unnecessary functionality.

The Interface Separation Principle contains rules and constraints that help deal with this problem.

**Entities should not depend on interfaces they do not use.**

When the principle is violated, modules are subject to all changes in the interfaces on which they depend.
This leads to high connectivity of modules with each other. The ISP helps design interfaces so that
so that changes affect only those modules whose functionality they actually affect.
Most often, this causes the interfaces to be split (split).

Interface separation principle:

- helps to fight against inheritance or implementation of unnecessary functionality;
- makes it possible to design modules so that they are affected by changes only to those interfaces,
which they actually implement;
- reduces the engagement of modules;
- destroys inheritance for the sake of inheritance, encourages the use of composition;
- allows you to identify higher abstractions and find non-obvious relationships between entities.

ISP can be thought of as the Single Responsibility Principle (SRP) for interfaces.
Fragmentation of interfaces really forces to divide the responsibility between them.

```typescript
interface PaymentProvider {
  getPaymentCommission: () => number;
  processPayment: () => string;
}

interface PaymentValidator {
  validate: () => boolean;
}

interface PaymentVerifier {
  verifyPayment: () => boolean;
}
```

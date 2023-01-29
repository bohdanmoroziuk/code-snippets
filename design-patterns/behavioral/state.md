# State

## Intent

**State** is a behavioral design pattern that lets an object alter its
behavior when its internal state changes. It appears as if the
object changed its class.

## Structure

1. **Context** stores a reference to one of the concrete state objects
and delegates to it all state-specific work.
2. The **State** interface declares the state-specific methods.
3. **Concrete States** provide their own implementations for the
state-specific methods.
4. Both context and concrete states can set the next state of the
context and perform the actual state transition by replacing
the state object linked to the context.

## Applicability

- Use the State pattern when you have an object that behaves
differently depending on its current state, the number of states
is enormous, and the state-specific code changes frequently.
- Use the pattern when you have a class polluted with massive
conditionals that alter how the class behaves according to the
current values of the class’s fields.
- Use State when you have a lot of duplicate code across similar
states and transitions of a condition-based state machine.

## Implementation

1. Decide what class will act as the context.
2. Declare the state interface.
3. For every actual state, create a class that derives from the state
interface.
4. In the context class, add a reference field of the state interface
type and a public setter that allows overriding the value
of that field.
5. Go over the method of the context again and replace empty
state conditionals with calls to corresponding methods of the
state object.
6. To switch the state of the context, create an instance of one
of the state classes and pass it to the context.

## Examples

```typescript
abstract class OrderState {
  constructor(
    protected order: Order,
  ) {}

  abstract cancelOrder(): void;

  abstract verifyPayment(): void;

  abstract shipOrder(): void;
}

class Order {
  private state: OrderState;

  constructor() {
    this.state = new PaymentPendingState(this);
  }

  setState(state: OrderState) {
    this.state = state;
  }

  cancelOrder() {
    this.state.cancelOrder();
  }

  verifyPayment() {
    this.state.verifyPayment();
  }

  shipOrder() {
    this.state.shipOrder();
  }
}

class CancelledOrderState extends OrderState {
  constructor(order: Order) {
    super(order);
  }

  cancelOrder(): void {
    console.log('The order is already cancelled');
  }

  verifyPayment(): void {
    console.log('The order is cancelled, you cannot pay anymore.');
  }

  shipOrder() {
    console.log('The order is cancelled, you cannot ship it anymore.');
  }
}

class PaymentPendingState extends OrderState {
  constructor(order: Order) {
    super(order);
  }

  cancelOrder() {
    console.log('Cancelling your unpaid order...');

    this.order.setState(new CancelledOrderState(this.order));
  }

  verifyPayment() {
    console.log('Payment verified! Shipping soon.');

    this.order.setState(new OrderBeingPrepared(this.order));
  }

  shipOrder() {
    console.log('Cannot ship order when payment is pending!');
  }
}

class OrderBeingPrepared extends OrderState {
  constructor(order: Order) {
    super(order);
  }

  cancelOrder() {
    console.log('Cancelling your order.. You will be refunded.');

    this.order.setState(new CancelledOrderState(this.order));
  }

  verifyPayment() {
    console.log('Payment is already verified.');
  }

  shipOrder() {
    console.log('Shipping your order now..');

    this.order.setState(new OrderShippedState(this.order));
  }
}

class OrderShippedState extends OrderState {
  constructor(order: Order) {
    super(order);
  }

  cancelOrder() {
    console.log('You cannot cancel an order that has been shipped.');
  }

  verifyPayment() {
    console.log('Payment is already verified');
  }

  shipOrder() {
    console.log('Order is already shipped');
  }
}

const order1 = new Order();

order1.verifyPayment(); // Payment verified! Shipping soon.
order1.shipOrder(); // Shipping your order now..
order1.cancelOrder(); // You cannot cancel an order that has been shipped.

const order2 = new Order();

order2.cancelOrder(); // Cancelling your unpaid order...

const order3 = new Order();

order3.verifyPayment(); // Payment verified! Shipping soon.
order3.cancelOrder(); // Cancelling your order.. You will be refunded.
```

## Resources

- [State](https://refactoring.guru/design-patterns/state)
- [State in TypeScript](https://refactoring.guru/design-patterns/state/typescript/example)
- [Design Patterns: State Pattern in TypeScript](https://levelup.gitconnected.com/design-patterns-state-pattern-in-typescript-32120b9a759f)
- [JavaScript State](https://www.dofactory.com/javascript/design-patterns/state)
- [State Design Pattern](https://sbcode.net/typescript/state/)
- [Typescript Design Pattern State](https://stackblitz.com/edit/typescript-design-pattern-state?file=index.ts)
- [Implementing the State Pattern in TypeScript](https://www.makeuseof.com/state-pattern-typescript/)
- [State Pattern](https://blog.sebastian-felling.com/blog/design-patterns/state-pattern)

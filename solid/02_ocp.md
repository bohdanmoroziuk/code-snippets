# Open-Closed Principle

According to the open-closed principle, modules should be open for extension, but closed for modification.
In simple words, modules should be designed in such a way that they need to be changed as little as possible,
and expanded functionality was possible by creating new entities and composing them with the old ones.

Modules that satisfy the OCP:

- open to extension - their functionality can be supplemented with other modules if the requirements change;
- closed for changes - extending the functionality of the module should not lead to changes in the modules that use it.

Violation of the open-closed principle leads to situations where a change in one module forces changes to others associated with it. This in turn violates the Single Responsibility Principle, SRP, because all code that changes for any one reason must be collected in one module. (Different modules, different reasons for changing.)

## Example

```typescript
interface Message {
  text: string;
}

interface Sender {
  sendMessage(message: Message): void;
}

class SmsSender implements Sender {
  sendMessage(message: Message): void {
    console.log('sms', message.text);
  }
}

class PushSender implements Sender {
  sendMessage(message: Message): void {
    console.log('push notification', message.text);
  }
}

class EmailSender implements Sender {
  sendMessage(message: Message): void {
    console.log('email', message.text);
  }
}

class Notifier {
  constructor(
    private sender: Sender,
  ) {}

  notify(message: Message) {
    this.sender.sendMessage(message);
  }
}
```

Open-closed Principle:

- forces to design modules so that they do only one thing and do it well;
- Encourages to bind entities through abstractions (rather than implementation) where business requirements may change;
- draws the attention of designers to the junction and interaction of entities;
- allows you to reduce the amount of code that needs to be changed when business requirements change;
- makes changes safe and relatively cheap.

**The key to understanding OCP is the use of abstractions at module interfaces.**

```typescript
interface Payable {
  pay(cart: Cart);
}

class BankTransfer implements Payable {
  pay(cart: Cart) {
    // Handle bank transfer payment
  }
}

class CreditCard implements Payable {
  pay(cart: Cart) {
    // Handle credit card payment
  }
}

class PayPal implements Payable {
  pay(cart: Cart) {
    // Handle PayPal payment
  }
}

class PayableFactory {
  static make(type: string) {
    if(paymentMethod === 'credit-card') {
      return new CreditCard();
    } else if (paymentMethod === 'paypal') {
      return new PayPal();
    } else (paymentMethod === 'bank-transfer') {
      return new BankTransfer();
  }
}

class Checkout {
  private cart: Cart;

  constructor(cart: Cart) {
    this.cart = cart;
  }

  process() {    
    const paymentMethod = request().get('payment_method') // getting user's selection
    const paymentFactory = new PaymentFactory(paymentMethod);

    paymentFactory.pay(cart);
  }
}
```

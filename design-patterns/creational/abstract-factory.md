# Abstract Factory

## Intent

**Abstract Factory** is a creational design pattern that lets you
produce families of related objects without specifying their
concrete classes. As long as the objects are created using the
factory, you don't have to worry about creating the wrong
combination of objects.

## Structure

1. **Abstract Products** declare interfaces for a set of distinct but
related products which make up a product family.
2. **Concrete Products** are various implementations of abstract
products, grouped by variants.
3. The **Abstract Factory** interface declares a set of methods for
creating each of the abstract products.
4. **Concrete Factories** implement creation methods of the
abstract factory.
5. The **Client** can work with any concrete
factory/product variant, as long as it communicates with their
objects via abstract interfaces.

## Applicability

- When a set of objects should be used together
- When the application should be independent of how the objects are
created
- If you have a class with multiple Factory Methods, consider switching
to an Abstract Factory
- If the types of the products are unknown beforehand or can change
dynamically

## Implementation

1. Map out a matrix of distinct product types versus variants of
these products.
2. Declare abstract product interfaces for all product types. Then
make all concrete product classes implement these interfaces.
3. Declare the abstract factory interface with a set of creation
methods for all abstract products.
4. Implement a set of concrete factory classes, one for each product
variant.
5. Create factory initialization code somewhere in the app.
6. Scan through the code and find all direct calls to product constructors.
Replace them with calls to the appropriate creation
method on the factory object.

## Example

```typescript
// Abstract products

interface Order {
  readonly id: number;
  addProduct(productId: string): void;
  addShippingAddress(address: string): void;
}

interface Payment {
  addCreditCardNumber(ccNumber: number): void;
  completePayment(order: Order): boolean;
}

// Concrete products

// Order object + Online variant

class OnlineOrder implements Order {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }

  addProduct(productId: string): void {
    console.log(`Product ${productId} added to the online order`);
  }

  addShippingAddress(address: string): void {
    console.log(`Shipping address ${address} added to the online order`);
  }
}

// Order object + Physical variant

class PhysicalOrder implements Order {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }

  addProduct(productId: string): void {
    console.log(`Product ${productId} added to the physical order`);
  }
  addShippingAddress(address: string): void {
    console.log(`Shipping address ${address} added to the physical order`);
  }
}

// Payment object + Online variant

class OnlinePayment implements Payment {
  addCreditCardNumber(ccNumber: number): void {
    console.log(`Credit card number ${ccNumber} added to the online payment`);
  }

  completePayment(order: OnlineOrder): boolean {
    console.log(`Payment completed for the online order ${order.id}`);
    return true;
  }
}

// Payment object + Physical variant

class PhysicalPayment implements Payment {
  addCreditCardNumber(ccNumber: number): void {
    console.log(`Credit card number ${ccNumber} added to the physical payment`);
  }
  completePayment(order: PhysicalOrder): boolean {
    console.log(`Physical payment completed for the physical order ${order.id}`);
    return true;
  }
}

// Abstract factory

interface CommerceFactory {
  createOrder(id: number): Order;
  createPayment(): Payment;
}

// Concrete factories

// Factory for the Online variant

class OnlineCommerceFactory implements CommerceFactory {
  createOrder(id: number): Order {
    return new OnlineOrder(id);
  }

  createPayment(): Payment {
    return new OnlinePayment();
  }
}

// Factory for the Physical variant

class PhysicalCommerceFactory implements CommerceFactory {
  createOrder(id: number): Order {
    return new PhysicalOrder(id);
  }

  createPayment(): Payment {
    return new PhysicalPayment();
  }
}

// Client

enum Variant {
  Online = 'online',
  Physical = 'physical'
}

class CommerceFactorySelector {
  static selectFor(variant: Variant) {
    if (variant === Variant.Online) {
      return new OnlineCommerceFactory();
    }

    return new PhysicalCommerceFactory();
  }
}

const commerceFactory = CommerceFactorySelector.selectFor(Variant.Physical);

const order = commerceFactory.createOrder(1);
const payment = commerceFactory.createPayment();

order.addProduct('123');
order.addShippingAddress('Earth');

payment.addCreditCardNumber(987654321);

payment.completePayment(order);

// Output

// Product 123 added to the physical order
// Shipping address Earth added to the physical order
// Credit card number 987654321 added to the physical payment
// Physical payment completed for the physical order 1
```

## Resources

- [Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory)
- [Abstract Factory pattern in TypeScript](https://www.jmalvarez.dev/posts/abstract-factory-typescript)
- [Abstract Factory Design Pattern](https://sbcode.net/typescript/abstract_factory/)

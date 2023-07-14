# Builder

## Intent

**Builder** is a creational design pattern that lets you construct
complex objects step by step. The pattern allows you to
produce different types and representations of an object using
the same construction code.

## Structure

![Builder pattern structure](https://refactoring.guru/images/patterns/diagrams/builder/structure.png?id=fe9e23559923ea0657aa5fe75efef333)

1. The **Builder** interface declares product construction steps that
are common to all types of builders.
2. **Concrete Builders** provide different implementations of the
construction steps.
3. **Products** are resulting objects.
4. The **Director** class defines the order in which to call construction
steps, so you can create and reuse specific configurations
of products.
5. The **Client** must associate one of the builder objects with
the director.

## Applicability

- Use the Builder pattern to get rid of a “telescoping
constructor”.
- Use the Builder pattern when you want your code to be able to
create different representations of some product.
- Use the Builder to construct Composite trees or other complex
objects.

## Implementation

1. Make sure that you can clearly define the common construction
steps for building all available product representations.
2. Declare these steps in the base builder interface.
3. Create a concrete builder class for each of the product representations
and implement their construction steps.
4. Think about creating a director class. It may encapsulate various
ways to construct a product using the same builder object.
5. The client code creates both the builder and the director
objects. Before construction starts, the client must pass a
builder object to the director. Usually, the client does this only
once, via parameters of the director’s class constructor. The
director uses the builder object in all further construction.
6. The construction result can be obtained directly from the
director only if all products follow the same interface. Otherwise,
the client should fetch the result from the builder.

## Examples

- Example #1

```typescript
class User {
  constructor(
    public username: string,
    public sex: string,
    public age: number,
    public photo: string,
    public email: string
  ) {}
}

class UserBuilder {
  public username: string;
  public sex: string;
  public age: number;
  public photo: string;
  public email: string;

  setUserName(name: string) {
    this.username = name;
    return this;
  }

  setSex(sex: string) {
    this.sex = sex;
    return this;
  }

  setAge(age: number) {
    this.age = age;
    return this;
  }

  setPhoto(photo: string) {
    this.photo = photo;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  build() {
    return new User(this.username, this.sex, this.age, this.photo, this.email);
  }
}

const user = new UserBuilder()
  .setAge(30)
  .setSex('male')
  .setEmail('')
  .setPhoto('')
  .setUserName('John_Doe')
  .build();
```

## Resources

- [Builder](https://refactoring.guru/design-patterns/builder)
- [Design Patterns: Builder Pattern in TypeScript](https://levelup.gitconnected.com/design-patterns-builder-pattern-in-typescript-2defc304954a)
- [Builder Design Pattern](https://sbcode.net/typescript/builder/)
- [Builder Pattern with a Fluent API in JavaScript](https://dhanrajsp.me/snippets/builder-pattern-in-javascript)

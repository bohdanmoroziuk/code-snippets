# Either

The Either monad, also known as the Result monad, is a monad that is used to
represent computations that can have one of two possible outcomes: a value of
type Left or a value of type Right. The Left type is typically used to
represent an error or failure, while the Right type is used to represent a
successful computation.

The Either monad is typically implemented as an object that has two subtypes:
Left and Right. The Left subtype holds an error value, while the Right subtype
holds a successful value.

Here’s an example of the Either monad in JavaScript:

```javascript
class Either {
  constructor(value) {
    this._value = value;
  }
  
  static left(value) {
    return new Left(value);
  }
  
  static right(value) {
    return new Right(value);
  }
  
  map(fn) {
    return this.isRight() ? Either.right(fn(this._value)) : this;
  }
  
  isRight() {
    return this instanceof Right;
  }
  
  isLeft() {
    return this instanceof Left;
  }
}

class Left extends Either {
  map() {
    return this;
  }
}

class Right extends Either {
  map(fn) {
    return Either.right(fn(this._value));
  }
}

const result = Either
  .right(2)
  .map(x => x + 2)
  .map(x => x * 3);

console.log(result._value); // 12

const result2 = Either
  .left(new Error('Invalid input'))
  .map(x => x + 2)
  .map(x => x * 3);

console.log(result2._value); // Error: Invalid input
```

## Resources

- [Nest.JS | Monads -> Either](https://nodeteam.medium.com/nest-js-monads-either-c077e1337469)
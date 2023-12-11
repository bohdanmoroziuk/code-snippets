# Custom Error Classes

The built-in `Error` class is a standard class in TypeScript that represents
an error object. It has a name property that indicates the type of error,
a message property that provides a human-readable description of the error,
and a stack property that contains the stack trace of where the error occurred.

The built-in Error class can be used to create and throw custom errors, or to
catch and handle errors thrown by other code. For example:

```typescript
try {
  // Some code that may throw an error
  throw new Error("Something went wrong!");
} catch (error) {
  // Handle the error
  if (error instanceof Error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
  } else {
    // Handle other errors
  }
}
```

You can create your own error types by extending the built-in `Error` class or
standard error classes. Note that you must call `super` in the child constructor,
and also to set the `name` property explicitly. Otherwise, the error name will
be “Error”, which is not very informative.


```typescript
class CustomError extends Error {
  constructor(message: string) {
    super(message);

    // Because we are extending a built-in class
    Object.setPrototypeOf(this, new.target.prototype);
    Object.defineProperty(this, 'name', { value: new.target.name });
  }
}
```

This way, you can throw and catch instances of `CustomError` and use the instanceof
operator to check their type.

```typescript
try {
  throw new CustomError('Something went wrong!');
} catch (error) {
  if (error instanceof CustomError) {
    console.log(error.name);
    console.log(error.message);
  } else {
    // Handle other errors
  }
}
```

You can also add other properties or methods to your custom error class, such
as a code, a data, or a log function.

```typescript
class HttpError extends CustomError {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
  }
}
```

You can use this class to throw and handle HTTP-related errors:

```typescript
try {
    throw new HttpError(500, 'Internal Server Error');
  } catch (error) {
    if (error instanceof HttpError) {
      console.log(error.statusCode, error.message);
    } else if (error instanceof CustomError) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
```

Custom error types allow you to define meaningful and descriptive error names
that convey the specific nature of the error. This improves the clarity and
readability of your code, making it easier to understand and maintain.

## Sources

- [Creating a Custom Error Class in TypeScript](https://medium.com/salvarlabs/creating-a-custom-error-class-in-typescript-cf6cc7dec657)
- [Deep dive into try-catch error types in TypeScript](https://byby.dev/ts-try-catch-error-type)
- [🍁The Superpowers of Custom Error Classes in TypeScript](https://medium.com/@mosaddeqsidi/the-superpowers-of-custom-error-classes-in-typescript-51560904c95c)
- [Create custom Class that extends from Error in TypeScript](https://bobbyhadz.com/blog/typescript-extend-error-class)
- [Better Error Handling in Typescript](https://edg.foo/blog/better-errors-ts)
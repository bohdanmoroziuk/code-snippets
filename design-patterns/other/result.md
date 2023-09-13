# Result Pattern

## Introduction

The Result pattern is a powerful concept in TypeScript that greatly enhances
error handling and code organization. By effectively managing success and
failure scenarios, the Result pattern provides a clear and structured approach
to handling operations that can yield different outcomes.

In the Result pattern, the Result type acts as a container that represents the
result of an operation. It typically consists of two possible states: success
and error. When an operation succeeds, the Result object holds the successful
result value. On the other hand, if an operation encounters an error, the
Result object captures the error details.

## Benefits

Using the Result pattern in TypeScript offers several benefits for software
development:

- **Explicit Error Handling**: The Result pattern enforces explicit error
handling by requiring developers to acknowledge and handle potential errors. 
- **Clear Separation of Success and Error Paths**: By differentiating between
success and error outcomes, the Result pattern promotes code clarity and
maintainability.
- **Improved Error Reporting**: The Result pattern allows for better error
reporting by capturing and propagating error details throughout the call stack.
- **Consistent Error Handling Strategy**: With the Result pattern, you can
establish a consistent error handling strategy across your codebase.

## Use Cases

Here are some examples and use cases where the Result Pattern proves to be
beneficial:

- **Handling API Requests**: When making API requests, the Result Pattern
allows you to handle success and error responses in a structured manner. 
- **Data Validation and Parsing**: When validating user input or parsing data
from external sources, the Result Pattern can help manage validation errors
and parsing failures effectively.
- **Database Operations**: When performing database operations, the Result
Pattern can assist in handling success and failure scenarios. 
- **File Operations**: File operations, such as reading or writing files, can
also benefit from the Result Pattern.
- **Asynchronous Operations**: The Result Pattern is especially useful when
dealing with asynchronous operations, such as Promises or async/await
functions.

## Implementation

```typescript
class Result<T, E> {
  public readonly isSuccess: boolean;
  private value?: T;
  private error?: E;

  private constructor(isSuccess: boolean, value?: T, error?: E) {
    this.isSuccess = isSuccess;
    this.value = value;
    this.error = error;
  }

  static success<T>(value: T): Result<T, undefined> {
    return new Result<T, undefined>(true, value);
  }

  static error<E>(error: E): Result<undefined, E> {
    return new Result<undefined, E>(false, undefined, error);
  }

  get isFailure(): boolean {
    return !this.isSuccess;
  }

  getValue(): T | undefined {
    return this.value;
  }

  getError(): E | undefined {
    return this.error;
  }
}

function divide(a: number, b: number) {
  if (b === 0) {
    return Result.error('Division by zero');
  }

  return Result.success(a / b);
}

const result = divide(10, 0);

if (result.isSuccess) {
  console.log('Result:', result.getValue());
} else {
  console.log('Error:', result.getError())
}

// Output:
// Error: Division by zero
```

## Best Practices and Tips

Here are some key recommendations:

- **Use Meaningful Success and Error Types**
- **Handle Errors Explicitly**: Avoid simply returning a Result object without
handling the error case in the calling code. By explicitly handling errors, you
can provide appropriate error messages, perform error recovery, or take other
necessary actions.
- **Leverage TypeScript’s Type System**: Utilize type annotations to ensure
that functions that return a Result type are properly handled in the calling
code.
- **Separate Error Handling from Business Logic**: Separate error handling
concerns into dedicated error handling functions or modules.
- **Document Error Cases and Return Types**: This helps other developers
understand the expected behavior and handle the Result objects correctly.
- **Consider Using Libraries**: These libraries often provide additional
features, utilities, and conventions that can streamline your implementation
and improve productivity.

## Libraries

- [neverthrow](https://github.com/supermacro/neverthrow)
- [oxide.ts](https://github.com/traverse1984/oxide.ts)
- [true-myth](https://true-myth.js.org/index.html)

## Resources

- [Understanding Result Pattern in TypeScript](https://medium.aegis-techno.fr/understanding-result-pattern-in-typescript-e82934cea096)
- [Flexible Error Handling w/ the Result Class | Enterprise Node.js + TypeScript](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/)
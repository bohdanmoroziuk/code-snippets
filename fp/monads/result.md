# Result

```typescript
interface Result<Success, Failure> {
  map<T>(f: (value: Success) => T): Result<T, Failure>;
  flatMap<T>(f: (value: Success) => Result<T, Failure>): Result<T, Failure>;
  match<T>(x: { success: (value: Success) => T, failure: (value: Failure) => T }): T;
}

const Failure = <S, F>(value: F): Result<S, F> => ({
  map() {
    return Failure(value);
  },
  flatMap() {
    return Failure(value);
  },
  match({ failure }) {
    return failure(value);
  },
});

const Success = <S, F>(value: S): Result<S, F> => ({
  map(f) {
    try {
      return Success(f(value));
    } catch (error) {
      return Failure(error);
    }
  },
  flatMap(f) {
    try {
      return f(value);
    } catch (error) {
      return Failure(error);
    }
  },
  match({ success }) {
    return success(value);
  },
});

// Usage

const parseJSON = <T>(value: string): Result<T, Error> => {
  try {
    return Success(JSON.parse(value));
  } catch (error) {
    return Failure(error);
  }
};

interface User {
  name: string;
}

parseJSON<User>(JSON.stringify({ name: 'John Doe' }))
  .map((x) => x.name)
  .match({
    // success John Doe
    success: (userName) => console.log('success', userName),
    failure: (error) => console.log('failure', error.message),
  });

parseJSON<User>('')
  .map((x) => x.name)
  .match({
    success: (userName) => console.log('success', userName), 
    // failure JSON.parse: unexpected end of data at line 1 column 1 of the JSON data
    failure: (error) => console.log('failure', error.message),
  });
```

# Introduction to Functional Programming

## Introduction

Functional Programming is a paradigm of building computer programs using
expressions and functions without mutating state and data.

## Main Concepts

Functional programming has several key concepts that are central to its
philosophy. These include:

### Immutable Data Structures

These are data structures that cannot be modified once they are created. This
eliminates the need for complex state management, and makes code more efficient
and predictable.

```typescript
import { Map } from 'immutable';

const map = Map({ a: 1, b: 2 });

const newMap = map.set('a', 3);
```

### Pure Functions

A pure function must satisfy both of the following properties:

- **Referential transparency**: The function always gives the same return value
for the same arguments. This means that the function cannot depend on any
mutable state.

- **Side-effect free**: The function cannot cause any side effects. Side
effects may include I/O (e.g., writing to the console or a log file), modifying
a mutable object, reassigning a variable, etc.

```typescript
function add(a: number, b: number) {
  return a + b;
}
```

A good rule of thumb is to follow the 80/20 rule: 80% of your functions should
be pure, and the remaining 20%, of necessity, will be impure.

If a function you're writing or using is void (i.e., it has no return value),
that's a clue that it's impure. If the function has no return value, then
either it's a no-op or it's causing some side effect.

### First-class Functions

First-class functions are functions that can be assigned to any other variable
or passed as an argument or can be returned by another function. This means
that functions are simply a value and are just another type of object.

```typescript
const add = (a: number, b: number) => a + b;

const average = (a: number, b: number, fn: (a: number, b: number) => number) => {
    return fn(a, b) / 2;
};

const result = average(2, 4, add); // 3
```

### Higher-order Functions

Functions can accept a function as an argument or/and can return a function as
the result.

```typescript
const numbers = [1, 2, 3, 4, 5];

const squares = numbers.map(x => x * x);
```

### Function Composition

Function composition is an approach where the result of one function is passed
on to the next function, which is passed to another until the final function is
executed for the final result. Function compositions can be composed of any
number of functions.

```typescript
const double = (x: number) => x * 2;

const square = (x: number) => x * x;

const result = square(double(2)); // 16
```

### Recursion

This is a technique that allows a function to call itself, and is often used in
functional programming to solve problems that would be difficult to solve using
traditional looping constructs.

```typescript
function factorial(n: number) {
  if (n === 0) {
    return 1;
  }

  return n * factorial(n - 1);
}
```

### Closure

This is a technique that allows a function to remember the state of its
environment, even when it is executed in a different context.

```typescript
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

const counter = makeCounter();
```

### Currying

Informally, `currying` is the process of taking a function that accepts `n`
arguments and turning it into `n` functions that each accepts a single
argument. The `arity` of a function is the number of arguments that it accepts.
A function that accepts a single argument is `unary`, two arguments `binary`,
three arguments `ternary`, and n arguments is `n-ary`. Therefore, we can define
currying as the process of taking an `n-ary` function and turning it into `n`
unary functions.

```typescript
function add(a: number) {
  return function(b: number) {
    return a + b;
  };
}
```

### Partial Application

Partial application and currying often go hand in hand, though they really are
separate concepts. A curried function is still a curried function even if it
hasn't been given any arguments. Partial application, on the other hand, is
when a function has been given some, but not all, of its arguments. Currying is
often used to do partial application, but it's not the only way.

### Declarative Programming

Declarative programming is a programming paradigm in which the focus is on
describing the desired outcome rather than on specifying how to achieve it.
This is in contrast to imperative programming, which focuses on specifying how
to achieve the outcome.

Declarative programming is a common approach used in functional programming,
and it is often used to describe the structure and behavior of data.

```typescript
const numbers = [1, 2, 3, 4, 5];

const squares = numbers.map(x => x * x);
```

### Functors

Often keeping unmodifiable is difficult to maintain. The pattern of wrapping
data into a container comes to the rescue. It secures the values so that
handling them is safe with the exclusion of side effects.

It has no complex logic. Its main task is to wrap the context and perform the
functions it receives from the outside on them. Each time the value changes, a
new container instance is repackaged and returned. When calling the map method,
which takes a specific action, it returns a new container instance with the
value returned by the passed function, while maintaining the non-modifiable
principle.

```javascript
const Functor = value => ({
  map: fn => Functor(fn(value)),
  chain: fn => fn(value),
  of: () => value
});
```

- **map** - useful when you want to change the state of a value in a container,
but don't want to return it yet.
- **chain** - used if you want to pass a value to a function without modifying
the container state. Usually at the end of map calls.
- **of** - return current value;

### Monads

Sometimes, in addition to the functions that trigger the new state of the
value, you need additional logic hidden in the container. This is where monad
comes in handy, as it is an extension of **functor**. It can, for example, decide
what should happen when the value has a certain value or what path the next
actions are to take.

## Resources

- [A Gentle Introduction To Functional Programming](https://levelup.gitconnected.com/a-gentle-introduction-to-functional-programming-f20df9ff2e2d)
- [Mastering Functional Programming: Techniques and Concepts for Efficient and Predictable Code](https://javascripttricks.com/mastering-functional-programming-techniques-and-concepts-for-efficient-and-predictable-code-f190d97ac1ee)
- [Introduction to Functional Programming](https://www.turing.com/kb/introduction-to-functional-programming)
- [Functional Programming - Introduction](https://www.tutorialspoint.com/functional_programming/functional_programming_introduction.htm)
- [An introduction to functional programming in JavaScript](https://opensource.com/article/17/6/functional-javascript)
- [Function composition in JavaScript](https://www.educative.io/answers/function-composition-in-javascript)
- [Functional Programming in JavaScript Part 1 – Introduction](https://thecodest.co/blog/power-of-functional-programming-in-javascript-part-1-introduction/)
- [Functional programming in JavaScript Part 2 - Combinators](https://thecodest.co/blog/power-of-functional-programming-in-javascript-part-2-combinators/)
- [Functional programming in JavaScript Part 3 - Functor & Monad Maybe](https://thecodest.co/blog/power-of-functional-programming-in-javascript-part-3-functor-monad-maybe/)
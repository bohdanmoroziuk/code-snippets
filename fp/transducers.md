# Transducers

```javascript
const curry = fn => (...args) =>
  args.length >= fn.length
    ? fn(...args)
    : curry(fn.bind(undefined, ...args));

const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);

const mapper = curry(
  (fn, reducer, accumulator, item) =>
    reducer(accumulator, fn(item))
);

const filterer = curry(
  (predicate, reducer, accumulator, item) =>
    predicate(item) ? reducer(accumulator, item) : accumulator
);

const reduce = curry(
  (fn, initialValue, input) =>
    input.reduce(fn, initialValue)
);

const transduce = curry(
  (transducer, reducer, initialValue, input) =>
    reduce(transducer(reducer), initialValue, input)
);

// example

const push = (list, item) => [...list, item];

const sum = (a, b) => a + b;

const isEven = x => x % 2 === 0;

const lte10 = x => x <= 10;

const square = x => x * x;

const add = curry(
  (a, b) => a + b
);

const increment = add(1);

const xform = compose(
  filterer(isEven),
  filterer(lte10),
  mapper(square),
  mapper(increment)
);

transduce(
  xform,
  push,
  [],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
)
// [ 1, 5, 17, 37, 65 ]

transduce(
  xform,
  sum,
  0,
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
)
// 125
```

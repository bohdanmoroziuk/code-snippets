# Lenses

```javascript
const { freeze } = Object;
const { isInteger } = Number;

const curry = fn => (...args) =>
  args.length >= fn.length
    ? fn(...args)
    : curry(fn.bind(undefined, ...args));

const ifElse = curry((condition, onTrue, onFalse) => (...xs) =>
  condition(...xs)
    ? onTrue(...xs)
    : onFalse(...xs)
);

const is = curry((x, y) =>
  x === y
    ? x !== 0 || 1 / x === 1 / y
    : x !== x && y !== y
);

const typeOf = x => typeof x;

const isTypeOf = curry((type, x) => is(typeOf(x), type));

const isInstanceOf = curry((ctor, x) => x instanceof ctor);

const or = curry((x, y) => x || y);

const isString = x => or(
  isTypeOf("string", x),
  isInstanceOf(String, x)
);

const constant = x => _y => x;

const map = curry((fn, array) => array.map(fn));

const spread = curry((fn, xs) => fn(...xs));

const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);

const prop = curry((key, object) => object[key]);

const nth = curry((offset, list) => {
  const index = offset < 0 ? list.length + offset : offset;

  return isString(list) ? list.charAt(index) : list[index];
});

const update = curry((index, value, array) =>
  array.map((v, i) => index === i ? value : v));

const assoc = curry((key, value, object) => ({ ...object, [key]: value }));

const lens = curry((getter, setter) => functor => target =>
  functor(getter(target)).map(focus => setter(focus, target))
);

const lensProp = key => lens(prop(key), assoc(key));

const lensIndex = index => lens(nth(index), update(index))

const makeLens = ifElse(
  isInteger,
  lensIndex,
  lensProp
);

const lensPath = path => spread(compose, map(makeLens, path));

const Const = x => freeze({
  value: () => x,
  map: _f => Const(x)
});

const Identity = x => freeze({
  value: () => x,
  map: f => Identity(f(x))
});

const view = curry((lens, object) => lens(Const)(object).value());

const over = curry((lens, fn, object) => lens(y => Identity(fn(y)))(object).value());

const set = curry((lens, value, object) => over(lens, constant(value), object));

const createGetterBy = (key, value) => array =>
  array.find(item => item[key] === value);

const createSetterBy = (key, value) => (newItem, array) =>
  array.map(item => item[key] === value ? newItem : item);

const lensBy = curry((key, value) => lens(
  createGetterBy(key, value),
  createSetterBy(key, value)
));

const createGetterWith = fn => array => array.find(fn);

const createSetterWith = fn => (newItem, array) =>
  array.map(item => fn(item) ? newItem : item);

const lensWith = fn => lens(
  createGetterWith(fn),
  createSetterWith(fn)
);
```

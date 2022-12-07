# Enum

Initial source code:

```typescript
enum DayOfWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

type Enum = { [s: number]: string };
```

## isEnumKey

Check if a key is property of enum

```typescript
const isEnumKey = <T extends Enum>(source: T, key: unknown) : key is keyof T => (
  Number.isInteger(source[key as keyof T])
);

console.log(isEnumKey(DayOfWeek, DayOfWeek[DayOfWeek.Monday])); // true
console.log(isEnumKey(DayOfWeek, 'NotExistingDay')); // false
```

## isEnumValue

Check if enum has a given value

```typescript
const isEnumValue = <T extends Enum>(source: T, value: unknown): value is T[keyof T] => (
  Number.isInteger(source[source[value as keyof T] as any as keyof T])
);

console.log(isEnumValue(DayOfWeek, DayOfWeek.Monday)); // true
console.log(isEnumValue(DayOfWeek, 77)); // false
```

## enumToKeys

Transform enum to list of keys

```typescript
const enumToKeys = <T extends Enum>(source: T): (keyof T)[] => (
  Object
    .keys(source)
    .filter((key: keyof T | any) => isEnumKey(source, key)) as (keyof T)[]
);

console.log(enumToKeys(DayOfWeek));

/*
[
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]
*/
```

## enumToValues

Transform enum to list of values

```typescript
const enumToValues = <T extends Enum>(source: T): T[keyof T][] => (
  enumToKeys(source).map((key: keyof T) => source[key])
);

console.log(enumToValues(DayOfWeek));

// [ 1, 2, 3, 4, 5, 6, 7 ]
```

## enumValueToKey

Transform enum value to its appropriate key

```typescript
const enumValueToKey = <T extends Enum>(source: T, value: T[keyof T]): keyof T | undefined => (
  (source as any)[value]
);

console.log(enumValueToKey(DayOfWeek, DayOfWeek.Monday)); // Monday
console.log(enumValueToKey(DayOfWeek, 44)); // undefined
```

## enumToEntries

Transform enum to entries

```typescript
const enumToEntries = <T extends Enum>(source: T): [keyof T, T[keyof T]][] => (
  enumToValues(source)
    .map((value: T[keyof T]) => [enumValueToKey(source, value) as keyof T, value])
);

console.log(enumToEntries(DayOfWeek));

/*
[
  [ 'Monday', 1 ],
  [ 'Tuesday', 2 ],
  [ 'Wednesday', 3 ],
  [ 'Thursday', 4 ],
  [ 'Friday', 5 ],
  [ 'Saturday', 6 ],
  [ 'Sunday', 7 ]
]
*/
```

## fromEnum

Project the list of objects from an enum

```typescript
const fromEnum = <T extends Enum, C>(
  source: T,
  projection: (item: [keyof T, T[keyof T]], index: number, array: [keyof T, T[keyof T]][]) => C,
  skip?: (value: [keyof T, T[keyof T]], index: number, array: [keyof T, T[keyof T]][]) => boolean,
) => {
  const entries = enumToEntries(source);

  if (skip) {
    return entries.filter(skip).map(projection);
  }

  return entries.map(projection);
};

interface Option<T> {
  label: keyof T;
  value: T[keyof T];
}

const options: Option<typeof DayOfWeek>[] = fromEnum(
  DayOfWeek,
  ([label, value]: [keyof typeof DayOfWeek, DayOfWeek]) => ({
    label,
    value,
  }),
);

console.log(options);

/*
[
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
  { label: 'Sunday', value: 7 }
]
*/
```

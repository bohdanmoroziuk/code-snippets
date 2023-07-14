# Guard Clauses/Early Returns

## Problem

If/else statements are the most common way to execute
conditional logic. However, complex and nested if/else
statements can quickly become a cognitive burden and
compromise the readability of a program.

## Solution

Guard Clauses leverage the ability to return early
from a function (or continue through a loop) to make
nested conditionals one-dimensional. Instead of using
if/else chains, we just return early from the function
at the end of each conditional block.

A guard clause is simply a single piece of conditional
logic at the beginning of a function which will return
from the function early if a certain condition is met.

## Example

Before:

```javascript
unction getInsuranceDeductible(insurance) {
  if (insurance.covered) {
    if (insurance.majorRepair) {
      return 500
    } else if (insurance.mediumRepair) {
      return 300
    } else {
      return 100
    }
  } else {
    return 0
  }
}
```

After:

```javascript
function getInsuranceDeductible(insurance) {
  if (!insurance.covered) return 0
  if (insurance.majorRepair) return 500
  if (insurance.mediumRepair) return 300

  return 100
}
```

## Resources

- [Guard Clauses - The Best Way To Write Complex Conditional Logic](https://blog.webdevsimplified.com/2020-01/guard-clauses/)
- [Guard Clauses - How to Clean up Conditionals](https://blog.boot.dev/clean-code/guard-clauses/)
- [Replace Nested Conditional with Guard Clauses](https://refactoring.guru/replace-nested-conditional-with-guard-clauses)
- [The bouncer pattern](https://mauriziopireddu.com/clean-code/the-bouncer-pattern)
- [Replace Nested Conditional with Guard Clauses](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)

# Test-driven development

## Introduction

The concept of Test-Driven Development (TDD) was introduced in 2003 by
Kent Beck. There is no formal definition but Beck gives approaches and examples
of TDD. The goal of TDD is to “write clean code that works”.

Test-driven development (TDD), sometimes referred to as test-driven design, is
a software development strategy that involves methodically testing code and
fixing any errors or oversights before the actual coding begins. This style of
programming is almost like a double-check system, where developers test their
code to make sure that it is as bug-free and efficient as possible.

In TDD, follow only one rule of thumb: *only change the production code if any
test fails. Otherwise, only refactor to optimize the code. For updated
requirements, convert them to test cases, add these tests, and only then write
new code*.

## The Three Phases of the TDD Cycle

![TDD Cycle](https://global-uploads.webflow.com/5d8afd5dd56fb3dd715b3bce/5e72bfd08a616a2a3f88b63f_TDD%20BLACK.jpeg)

The test driven development cycle follows three phases, each of which is
essential for the successful completion of a software project. Known as the
Red, Green, and Refactor phases, these are the defining sequence of TDD:

1. Red Phase

    The Red Phase is when you write a test that fails, ensuring that your coding
    works as intended. Failing tests provide valuable information and should be
    welcomed, as they indicate that the test is working properly.

2. Green Phase

    The second phase is the Green Phase. During this step, you write the code that
    will make the test defined in the Red Phase pass. You should take care to
    ensure that the code you write is clean, concise, and effective.

3. Refactor Phase

    The final phase of TDD is the Refactor Phase. During this step, you can modify
    and refactor the code you have written to be more efficient and easier to read.
    This is a great way to make sure that your code is efficient and maintainable.

TDD takes an iterative approach to writing software. A test is added as soon as
a requirement is clear. This test intends to fail at this point as the
implementation code is yet to be written. The next step is to write the code to
make the test pass quickly. After the test passes, we check the code and
refactor it to make the code better. Don’t forget to rerun the test after
refactoring to ensure that it passes. Once complete, we pick up the next
requirement and follow the same process. TDD is the art of changing the colour
of tests from red (failed) to green (passed).

## Test Driven Development Process: 5 Steps

The test driven development process consists of five steps that developers
follow and repeat until the software is complete. Here’s an explanation of each
and what’s involved:

1. Write a Test

    Write test code that defines a function or improvement that you want to make in
    the code. The test should be written before any coding is done, as it will
    define the code that needs to be written.

2. Run All Tests & See the Test Fail

    Once the test is written, you can run all the tests in your suite to make sure
    that the one you just wrote fails. This will confirm that it works properly.

3. Write Code to Pass the Test

    Once the test fails, it’s time to write the code that will make the test pass.
    This step is all about writing and testing until you get the desired result.

4. Confirm the Test Passes

    After the code is written, run all of your tests again to make sure that the
    one you just wrote now passes. If it doesn’t, you will have to go back and
    tweak the code until it does.

5. Refactor the New Code

    The final step is to refactor the code you just wrote and rinse-and-repeat
    the process. This involves repeating Steps 1 through 5 until all the desired
    tests have been written and passed.

## Common practices in the TDD cycle

### Small units

A unit is a class/module that is a group of closely related functions, often
called a module. Keeping units small adds benefits such as easier testing and
debugging.

### Test structure

As you will always be running tests for units, it’s important to apply the
following test structure:

**Setup**: Getting the system or Unit Under Test (UUT) into the necessary state to
run the tests, ensuring the preparedness of the system for testing.
**Execution**: Run the test on the target and monitor all return values and
outputs, ensuring that the path of execution is the one you’re targeting.
**Validation**: Assert/Ensure that the results are correct. This is the point of
declaring whether the test Passed/Failed.
**Cleanup**: Restore the test-system to the original state. This permits another
test to execute immediately.

### Practices to avoid

- Determinism – make sure the tests are deterministic. Dependency on events such
as API calls or system date/time can cause tests to fail even without changes
in code.
- If possible, avoid requiring an order of execution for testing, and allow
random execution of tests. Similarly, avoid having the tests depend on
previous or other test results.
- Testing precise execution behavior timing or performance.
- Do not develop test cases that evaluate more than they should
(“all-knowing oracles”).
- Do not design tests that take significantly longer to execute.

### Individual practices

- Keep every test focused only on the results necessary to validate it.
- In non-real time systems, develop time-related tests to enable tolerance
for execution. Allowing a 5% to 10% margin for late execution to reduce the
probability of false negatives during testing is a common practice.
- Treat the test code the same as the production code. This improves code
quality and robustness.
- Split the tests into smaller tests wherever feasible.
- As a team, review your tests and test practices to share effective techniques
and catch bad habits.

## Advantages and disadvantages

### Benefits

- Writing tests in TDD forces you to think about use cases, and improves
productivity.
- Even considering that the amount of code based on writing unit tests, the
total implementation will be shorter and less buggy.
- Debugging becomes easier.
- If common TDD practices are followed, the code developed is modularized,
flexible, and extensible.
- Automatic regression detection on every incremental update.
- Automated tests are very thorough. As no more code is written than necessary
to pass the failing tests, these automated tests tend to cover every code path.
- Easier documentation, unit tests are self-documenting, easier to read and
understand. You should always descriptively document the source/production code.

### Limitations

- TDD does not do well when functional tests are required, such as GUI design.
- When developers themselves write the unit tests, the tests may share the
same blind spots as the code.
- At times, high numbers of passing tests can create a false sense of security,
causing fewer testing activities during integration testing, potentially
causing problems.
- Tests become part of the maintenance overhead. Badly written tests can
further cause more costs in maintenance or updating.
- The level of detail achieved during TDD cannot be easily recreated later on.

## Sources

- [Should I be doing test-driven development?](https://www.codewithjason.com/test-driven-development/)
- [Test-Driven Development (TDD) – Quick Guide [2023]](https://brainhub.eu/library/test-driven-development-tdd)
- [Test-Driven Development: Guide for Beginners](https://www.codingdojo.com/blog/test-driven-development)
- [TDD for beginners - Part 1](https://www.fabricgroup.com.au/blog/tdd-for-beginners-part-1)
- [Test-Driven Development for beginners](https://womanonrails.com/tdd-basic)

## Courses

- [Learn Test Driven Development (TDD)](https://github.com/dwyl/learn-tdd)
- [Todo List App JavaScript Tutorial](https://github.com/dwyl/javascript-todo-list-tutorial)
# Best Practices

## Arrange, Act, and Assert

The Arrange, Act, and Assert (AAA) is a widely used technique in unit testing.
It involves breaking down a test into three distinct phases:

1. Arranging the test data.
2. Performing the Action or method call.
2. Asserting the results.

To apply the AAA pattern, you should first arrange the test by setting up the
necessary mocks and component instance. Then, you should act by performing the
action or method call that you want to test. Finally, you should assert the
results by checking that the output of the method call matches the expected
output.

## Descriptive Names and Descriptions

Clear and concise test names and descriptions are essential for effectively
communicating the purpose and scope of the test and making it easier to
understand and maintain them.

To write good test names and descriptions, you should use descriptive and
meaningful names that accurately reflect the purpose of the test. You should
also include relevant details in the description, such as the input data and
expected output.

## Fast

Unit tests should be fast to ensure a seamless development workflow. Quick
test execution allows for prompt feedback, making it easier to identify and
fix issues. To create speedy tests, avoid external dependencies and minimize
I/O operations. Utilize mocks and stubs to simulate dependencies and focus on
testing small, isolated pieces of code.

## Deterministic

Deterministic tests are tests that produce the same output every time they are
run. They are important because they help ensure that the tests are reliable
and repeatable. To write deterministic tests, avoid using random data and
external sources that can change. Use repeatable inputs and keep test
environments consistent. Also, avoid using shared global resources that other
tests can modify.

## Comprehensive

A well-rounded unit test assesses both successful execution and potential
failures (happy & unhappy paths). It’s vital to test functions using valid
inputs to confirm expected results and invalid inputs to identify potential
issues. Furthermore, validate error handling by examining proper responses to
thrown exceptions during path execution.

## Test-driven Development

Test-driven development (TDD) is a technique of writing tests before or during
the development process. It ensures that the code is testable and that the
tests cover all the necessary scenarios.

## Using Mocks

Mocks simulate the behaviour of external dependencies or objects. They are
important because they help isolate the code being tested and make it easier
to write deterministic tests.

To use mocks efficiently, start by identifying external dependencies that must
be mocked. Then, generate a mock/stub object that mimics the behaviour of the
dependency. This provides full control of returned values and the ability to
track invocations and their associated parameters.

## Run on CI/CD

By integrating unit tests into your development pipeline and ensuring their
successful execution, you can prevent potential issues from slipping into
production environments.

## Resources

- [8 Tips for Writing Better Unit Tests](https://fadamakis.com/8-tips-for-writing-better-unit-tests-8c0a8d8cde16)
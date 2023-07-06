# Clean Architecture

![Clean Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

The clean architecture is a way of separating responsibilities and parts
of functionality according to their proximity to the application domain.

By the domain, we mean the part of the real world that we model with a
program. This is the data transformations that reflect transformations in
the real world.

Clean Architecture combines the ideas of several other architectural approaches
that agree that the architecture should:

- be testable;
- not depend on UI;
- do not depend on the database, external frameworks and libraries.

This is achieved by layering and following The Dependency Rule.

## The Dependency Rule

Each layer in the diagram represents a different layer of code.
In general, the deeper you move inside the diagram, the higher
the level of abstraction you get. The outer layers are the
implementation, the inner layers are the rules.

The main rule that makes this architecture work is `The Dependency Rule`.
The rule is: **the outer layers know about the inner layers, but not vice versa**.
Nothing from the inner layer should know about the existence of the outer.

## Layers

- Entities: Business logic is common to many applications.
- Use Cases (Interactors): Application logic.
- Interface adapters: Adapters between Use Cases and the outside world. This
includes Presenters from MVPs, as well as Gateways (the more popular name
for the repository).
- Frameworks: The outermost layer, everything else lies here: UI, database,
http client, etc.

### Entities

Entities contain the business logic used throughout the application.
Entities can be an object with methods, or it can just be a collection
of data structures and functions.

With any external changes, Entities are the last thing that those changes
can affect.

So the `Entities` layer contains:

- Entities - functions or objects with methods that implement business logic
common to many applications (and if there is no business, then the highest-level
application logic);
- DTOs needed to work and transition between layers.

In addition, when the application is separate, you should try to find and
highlight high-level logic in Entities from the UseCases layer, where it often 
settles by mistake.

### Use Cases

The code at this level contains the business rules for a specific application.
It contains and implements all possible use cases for the system. Use cases are
responsible for the flow of data to/from `Entities` and use `Entities` to perform
the necessary actions.

Changes to this layer should not affect `Entities`. Also, changes to external
layers such as Databases should not affect `Use Cases` in any way.

However, the `Use Cases` code will be changed when the application logic changes.
If any use case of the application changes, those changes will be implemented in
this layer.

### Interface Adapters

This layer is a set of adapters that convert data from a format that is convenient
for use in `Entities` and `Use Cases` to a format that is more convenient for
external services such as Databases or Web Services.

### Frameworks and Drivers

The furthest, outer layer, consisting of frameworks and various tools, such as
databases, web services. On this layer all the details are implemented.
Communication with Web services is the details. Databases are details. We left
it all on the outside so as not to harm the inner layers.

## Principles

Clean Architecture has basic principles that a developer must follow. These
principles are:

1. Separation of business concepts from infrastructure.

    In Clean Architecture, business logic is placed in the domain layer, while
    infrastructure technology is placed in the infrastructure layer.

2. Use of dependency inversion.

    In this case, high-level modules no longer depend on low-level modules, but both
    depend on abstractions. This principle is beneficial in avoiding coupling problems
    that can occur when one class is too dependent on another class.

3. Use of SOLID Principles.

    Implementing SOLID Principles can help developers create clean and easily
    understandable code.

## Steps to implement

1. Determine the purpose and scope of the application.

    This will make it easier to determine the structure and architecture of the code.

2. Create an application architecture design.

    This design should include different layers, such as the domain layer, infrastructure
    layer, and presentation layer.

3. Determine directory structure.
4. Create a Standard Operating Procedure (SOP).

    To ensure consistency in code development, an SOP must be created and followed by all
    team members. The SOP should include guidelines for variable naming, function naming,
    comments, and documentation.

5. Use SOLID Principles.

    Each SOLID principle should be understood and applied correctly.

6. Use Design Patterns.

    Design patterns can help clarify the tasks and responsibilities of each coding layer.

7. Use Test-Driven Development (TDD).

    By following TDD, developers can create better and easily testable code.

8. Implement Continuous Integration and Continuous Deployment.

    CI and CD ensure that the code is always tested and deployed automatically whenever
    there is a change in the code.

## Maintaining

Here are some ways to maintain the effectiveness of clean code:

1. Conduct regular Code Reviews.
2. Use Tools for Code Analysis.
3. Follow Best Practices.
4. Conduct regular Refactoring.
5. Follow the KISS (Keep It Simple, Stupid).

## Conclusion

By layering your code and following `The Dependency Rule`, you can create a system
that is truly testable, with all the benefits it entails.

## Resources

- [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Clean Architecture on Frontend](https://bespoyasov.me/blog/clean-architecture-on-frontend/)
- [Clean Architecture: Entities and Models](https://paulallies.medium.com/clean-architecture-entities-and-models-f800ef3a6905)
- [Clean Architecture: Repositories](https://paulallies.medium.com/clean-architecture-repositories-a3360184dd66)
- [Clean Architecture: Data Sources](https://paulallies.medium.com/clean-architecture-data-sources-8fa9f8e02c90)
- [Clean Architecture: Use Cases](https://paulallies.medium.com/clean-architecture-use-cases-f5d476f4ed86)
- [Clean Architecture: Unit Testing](https://paulallies.medium.com/clean-architecture-unit-testing-dc8a37a03eaa)
- [Clean Architecture with PHP](https://medium.com/unil-ci-software-engineering/clean-architecture-with-php-22de915a6c50)
- [Clean Architecture .NET](https://levelup.gitconnected.com/clean-architecture-net-b79fb5f2e17d)
- [Laravel Domain Driven Design: A Comprehensive Guide](https://medium.com/@mianhaseeb41/laravel-domain-driven-design-a-comprehensive-guide-c8b12c7ad79a)
- [Implementing clean architecture in flutter apps](https://santhosh-adiga-u.medium.com/implementing-clean-architecture-in-flutter-apps-5c8e37253841)
- [Clean Architecture: Flutter App](https://nanosoft.co.za/blog/post/clean-architecture-flutter)
- [Building a Todo App with TypeScript Using Clean Architecture: A Detailed Look at the Directory Structure](https://medium.com/@walid.karray/building-a-todo-app-with-typescript-using-clean-hexagonal-architecture-a-detailed-look-at-the-d9e177f9f31)
- [The Benefits of Using Clean Architecture in Vue](https://www.mitrais.com/news-updates/the-benefits-of-using-clean-architecture-in-vue/)
- [101 Clean Code Architecture](https://medium.com/bento-tech-innovation/101-clean-code-architecture-651e2650bbe8)
- [What is Clean Architecture? Do you need it?](https://isriramkumarm.medium.com/what-is-clean-architecture-do-you-need-it-fdc1060d6425)

# Clean architecture in React

## Overview

Clean Architecture is a software design principle that promotes separation of
concerns and independence of dependencies within a codebase. By adhering to
this architectural approach, you can achieve a highly modular, testable, and
maintainable codebase for your React projects.

Clean Architecture is based on the principle of Dependency Inversion, which
states that high-level modules should not depend on low-level modules but both
should depend on abstractions. The main idea behind this principle is to
decouple the application’s core business logic from external concerns like
frameworks, libraries, and databases. By doing so, you can achieve a codebase
that is flexible, reusable, and easy to modify without affecting the entire
system.

## Layers

Clean Architecture consists of several layers that encapsulate different
aspects of an application.

![Clean architecture](https://matthewrenze.com/wp-content/uploads/2019/04/Clean-Architecture.png)

These layers are:

- Presentation Layer: This layer is responsible for handling the user interface
(UI) components. In a React project, it includes React components, forms, and
UI-related logic.
- Application Layer: This layer contains the use cases or application-specific
business logic. It coordinates the flow of data between the Presentation and
Domain layers.
- Domain Layer: This is the core layer of the application and represents the
business rules and entities. It should be independent of any external
dependencies and frameworks.
- Data Layer: This layer is responsible for working with external data sources.
It provides implementations for the interfaces defined in the Domain layer.
- Infrastructure Layer: This layer deals with external concerns such as
databases, API calls, and third-party libraries.

## Project structure

```txt
src/
├── infrastructure/
│   └── http
│   └── logger
├── domain/
│   ├── entities
│   └── repositories
├── data/
│   └── repositories
├── application/
│   └── services
├── presentation/
│   ├── components
│   ├── containers
│   ├── pages
│   └── stores
└── index.ts
```

## Examples

- [react-clean-arch](https://github.com/janithl/react-clean-arch)
- [clean-typescript-react](https://github.com/nanosoftonline/clean-typescript-react)
- [flexible-counter-app](https://github.com/itshugota/flexible-counter-app)
- [clean-mvvm-react](https://github.com/nanosoftonline/clean-mvvm-react)
- [clean-typescript-react](https://github.com/nanosoftonline/clean-typescript-react)
- [react-clean-architecture](https://github.com/eduardomoroni/react-clean-architecture)

## Sources

- [Clean Architecture: Typescript and React](https://paulallies.medium.com/clean-architecture-typescript-and-react-8e509098abfe)
- [Clean Architecture: TypeScript and React](https://codefoundation.co.za/clean-architecture-typescript-and-react)
- [Clean MVVM with React and React Hooks](https://paulallies.medium.com/clean-mvvm-with-react-and-react-hooks-ebc37b22542f)
- [Improve React Component Maintainability with Layered Architecture](https://blog.bitsrc.io/improve-react-component-maintainability-with-layered-architecture-25e74ba86430)
- [Architecting React Apps for Success: A Deep Dive into Clean Architecture](https://javascript.plainenglish.io/architecting-react-apps-for-success-a-deep-dive-into-clean-architecture-839b784fbe04)

---

- [My take on doing 'Clean Architecture' in React (Part 1)](https://janithl.github.io/2019/10/react-clean-architecture-part-1/)
- [My take on doing 'Clean Architecture' in React (Part 2)](https://janithl.github.io/2019/10/react-clean-architecture-part-2/)
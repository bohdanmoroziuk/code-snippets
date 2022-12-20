# Dependency Inversion Principle

Software systems consist of modules, which we can conditionally divide into low-level and high-level.
Low-level ones contain utility functionality: accessing the database, queries to the server, rendering
DOM elements on the page.
High-level ones contain complex, more abstract business logic. They are abstract enough to be
was reused in different projects: user authorization, form validation, sending notifications.
In stable systems, high-level modules usually do not need to be updated when lower-level ones change.
The principle of dependency inversion helps to achieve such stability.

DIP and testability

When testing a module that depends on other modules, we need to either instantiate each dependency or create stubs.
DIP simplifies system testing. If modules depend on interfaces, we just need to create a stub that implements that interface.

The Dependency Inversion Principle suggests that:

- High-level modules should not depend on low-level ones; both types must depend on abstractions.
- Abstractions should not depend on details, details should depend on abstractions.

In this way, DIP helps to reduce module coupling.

Dependency Inversion Principle:

- introduces rules and restrictions for the dependence of some modules on others;
- reduces the engagement of modules;
- makes unit testing easier;
- allows you to design the system so that the modules are replaceable by others.

## Example

```typescript
interface DatabaseConnection {
  connect(host: string, user: string, password: string): void;
}

class MySqlConnection implements DatabaseConnection {
  constructor() {
    //
  }
  
  connect(host: string, user: string, password: string): void {
    //
  }
}

class Auth {
  constructor(
    private connection: DatabaseConnection,
  ) {}

  authenticate(login: string, password: string) {
    //
  }
}
```

## Coupling and cohesion

Coupling should not be confused with cohesion.

Coupling is the degree of interdependence of different modules. The higher the engagement, the more brittle it turns out
system, and the more difficult it is to make changes.
Cohesion is the degree to which the tasks of a module are related to each other.

## Abstractions

According to the principle, modules should not depend on other modules directly, but on abstractions. Modules now
it is not necessary to work with specific modules, they can work with any entity that implements
specified interface. This reduces adhesion.

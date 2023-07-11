# Generic Repository Pattern

The generic repository design pattern is a way of abstracting data access logic.
It is used to provide a common interface for interacting with a data
source, such as a database, and can be used to abstract away the details of the
specific data access implementation.

## Example

```typescript
interface Repository<T extends object> {
  getAll(): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  add(entity: T): Promise<void>;
  update(entity: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
```

This interface defines a set of basic CRUD (create, read, update, delete)
methods for interacting with a data source.

The generic repository pattern is a useful way of abstracting data access logic
and providing a consistent interface for interacting with a data source. It
can help to improve the modularity and testability of code, and make it easier
to maintain and extend.

In addition to the basic CRUD methods, you can also define custom repository
methods that perform more specific tasks.

It is common to create a separate repository for each entity type, rather than
having a single repository that can work with any entity type. 

## Resources

- [Generic Repository Design Pattern](https://medium.com/@CodeWithHonor/generic-repository-design-pattern-8f5f3563f571)
- [Repository Pattern](https://deviq.com/design-patterns/repository-pattern)
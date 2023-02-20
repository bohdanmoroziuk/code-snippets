# Date

- Constants

```typescript
const MS_PER_DAY = 1000 * 3600 * 24;
```

- Check if a date is a weekday

```typescript
const isWeekday = (date: Date) => date.getDay() % 6 !== 0;
```

- Generate UNIX timestamp from date

```typescript
const getTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);
```

- Calculate the days between two dates

```typescript
const diffInDays = (start: Date, end: Date) => (
  Math.ceil((end.getTime() - start.getTime()) / MS_PER_DAY);
);
```

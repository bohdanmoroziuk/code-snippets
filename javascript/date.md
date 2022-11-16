# Date

- Check if a date is a weekday

```typescript
const isWeekday = (date: Date) => date.getDay() % 6 !== 0;
```

- Generate UNIX timestamp from date

```typescript
const getTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);
```

# optionOrDefault

```typescript
export const optionOrDefault = <O>(
  key: string,
  optionMap: Record<string, O>,
  defaultOption: O): O => (
    optionMap[key] || defaultOption
  );

const defaultText = 'You’ve received some sort of notification we don’t know about.';

const textOptions = {
  citation: 'You received a citation from {{actingUser}}.',
  follow: '{{actingUser}} started following your work',
  mention: '{{actingUser}} mentioned you in a post.',
};

function getNotificationPattern(notification: { type: string }) {
  return optionOrDefault(notification.type, textOptions, defaultText);
}

getNotificationPattern({ type: 'follow' });

// {{actingUser}} started following your work
```

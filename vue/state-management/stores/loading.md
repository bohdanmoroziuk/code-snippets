# useLoadingStore

```typescript
import { defineStore } from 'pinia';

export interface LoadingState {
  loadings: Record<string, boolean>;
}

export const useLoadingStore = defineStore('loading', {
  state: (): LoadingState => ({
    loadings: {},
  }),
  getters: {
    any(state: LoadingState) {
      return Object.values(state.loadings).some((loading) => loading);
    },
    is(state: LoadingState) {
      return (name: string) => !!state.loadings[name];
    },
  },
  actions: {
    start(name: string) {
      this.loadings[name] = true;
    },
    stop(name: string) {
      this.loadings[name] = false;
    },
  },
});
```

# Error Handling

## Component Level Error Handling

### Error Boundary Component

Starting from React 16, you can create an error boundary component by defining
a class component with a `componentDidCatch(error, errorInfo)` lifecycle method.
The `componentDidCatch` method is triggered when an error is thrown by a
descendant component, allowing you to handle the error and update the
component's state accordingly.

By defining an error boundary component, you can handle errors gracefully and
present a fallback UI to the user.

## Global Error Handling

### Window Event Listeners

To handle errors that occur outside of React's component hierarchy, you can use
global error handlers by attaching event listeners to the `window` object.

You can use the `window.addEventListener('error', (event: ErrorEvent) => {});`
to catch unhandled exceptions:

```typescript
window.addEventListener('error', (event: ErrorEvent) => {
  // Handle the error
});
```

### Unhandled Promise Rejections

In addition to general exceptions, it’s important to handle unhandled promise
rejections, which occur when a promise is rejected but no error handler is
provided. To handle unhandled promise rejections, use the `unhandledrejection`
event:

```typescript
window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
  // Handle the error
});
```

## Network Error Handling

### Handling Network Errors with Axios

When working with network requests in a React application, you may encounter
various types of errors, such as server errors, network connectivity issues, or
unexpected response data. To handle network errors effectively, you can use a
popular library like Axios.

It allows you to intercept requests and responses, which can be useful for
handling network errors globally.

To handle network errors with Axios, you can use an interceptor:

```typescript
import axios, { type AxiosResponse, AxiosError } from 'axios';

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    return response;
  },
  (error: AxiosError) => {
    // Handle error responses
    if (error.response) {
      // The request was made and the server responded with an error status
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);
```

### Implementing Retry Mechanisms

When handling network errors, it can be beneficial to implement a retry
mechanism, which automatically retries failed requests. You can use a library
like axios-retry to achieve this:

```typescript
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
  retries: 3, // Number of retry attempts
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Time delay between retries in milliseconds
  },
  retryCondition: (error) => {
    // Only retry if the request failed due to a network error
    return error.request && !error.response;
  },
});
```

## Error Logging and Monitoring

### Integrating with Sentry

In an enterprise environment, it’s essential to log and monitor errors to
ensure the smooth operation of your application. Sentry is a popular error
tracking and monitoring service that can be easily integrated with a React
application.

- Install the Sentry SDK:

```bash
npm install --save @sentry/react
```

- Configure Sentry in your application’s entry file (e.g., main.ts):

```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  integrations: [
    new Sentry.BrowserTracing({
      // See docs for support of different versions of variation of react router
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
    new Sentry.Replay()
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

Replace `YOUR_SENTRY_DSN` with the DSN provided by Sentry when you create a new
project.

- Add Readable Stack Traces to Errors

```bash
npx @sentry/wizard@latest -i sourcemaps
```

With Sentry integrated, errors that occur in your React application will be
automatically logged and reported to Sentry, where you can analyze and resolve
them.

### Custom Error Logging Solutions

If you prefer to implement your own error logging solution, you can extend the
global error handling and Axios interceptor examples discussed earlier in this
guide. For instance, you can send error information to your backend API or log
it to an external logging service.

Here’s an example of how you might modify the global error handling code to
send errors to your backend:

```typescript
const logError = async (error: Error) => {
  try {
    await axios.post('/api/log/error', { error });
  } catch (e) {
    console.error('Error logging failed:', e);
  }
};

window.addEventListener('error', (event: ErrorEvent) => {
  logError(error);
});

window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
  logError(event.reason);
});
```

Similarly, you can modify the Axios interceptor to log network errors:

```typescript
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    logError(error);

    return Promise.reject(error);
  }
);
```

## Sources

- [How to Handle Errors in an Enterprise React Application](https://asimzaidi.medium.com/how-to-handle-errors-in-an-enterprise-react-application-90efc6202539)
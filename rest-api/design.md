# Key requirements for a clean API

> Practical advice for designing REST APIs.

## Rules

- Be simple
- Be consistent (standardize the style before you start)
- Be secure
- Be lightweight (minify and zip your response)
- Allow filtering, sorting, and pagination
- Use the right HTTP Methods
- Use the right response status
- Whatever you do, always document it!

## Golden rules

- Flat is better than nested.
- Simple is better than complex.
- Strings are better than numbers.
- Consistency is better than customization.

## Recommendations

### Use plural names for collections

```text
/users
```

### Use nouns not verbs

Don’t forget! HTTP methods exist for a purpose!

```text
GET /users
PUT /users/{userId}
```

### Use verbs for non-resource URL

You have an endpoint that returns nothing but an operation. In this case, you can use verbs.
For example, if you want to resend the alert to a user.

```text
POST /alerts/245743/resend
```

Keep in mind that these are not our CRUD operations.
Rather, these are functions that do a specific job in our system.

### Use kebab-case for URLs

```text
/system-orders
```

### Use camelCase for parameters

```text
/system-orders/{orderId}
```

### Use camelCase for JSON

```text
{
  userName: "ehe"
}
```

### Think about the future, consider versioning

```text
http://api.domain.com/v1/users
```

### Include the total number of resources in your response

```text
{
  users: [ 
    ...
  ], 
  total: 34
}
```

### Accept limit and offset parameters

Always accept limit and offset parameters in GET operations.

```text
GET /shops?offset=5&limit=5
```

### Take fields query parameter

Add a `fields` parameter to expose only the required fields from your API.

```text
GET /shops?fields=id,name,address,contact
```

It also helps to reduce the response size in some cases.

### Use the relation in the URL for nested resources

```text
GET /shops/2/products/31
```

### Don’t pass authentication tokens in URL

Instead, pass them with the header.

```text
Authorization: Bearer xxxxxx, Extra yyyyy
```

### Validate the Content-Type

### Use HTTP Methods for CRUD functions

HTTP methods serve the purpose of explaining CRUD functionality.

- `GET`: to retrieve a representation of a resource.
- `POST`: to create new resources and sub-resources.
- `PUT`: to update existing resources.
- `PATCH`: to update existing resources. It only updates the fields that were supplied, leaving the others alone.
- `DELETE`: to delete existing resources.

### CORS

Do support CORS (Cross-Origin Resource Sharing) headers for all public-facing APIs.

### Security

Enforce HTTPS (TLS-encrypted) across all endpoints, resources, and services.
Enforce and require HTTPS for all callback URLs, push notification endpoints, and webhooks.

### Errors

Service errors occur when a client makes an invalid or incorrect request or passes invalid or
incorrect data to a service, and the service rejects the request.

### Consider monitoring

It’s not mandatory, but it’s recommended.

- `/health`: checks API’s health status
- `/version`: respond to the request with the latest version number
- `/metrics`: provides some metrics like average response time.
- `/debug` and `/status` endpoints are also highly recommended.

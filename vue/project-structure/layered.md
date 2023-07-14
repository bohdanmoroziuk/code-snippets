# Layered project structure

## Definition of Clean Architecture 

Clean Architecture is a design pattern that uses "separation of layers,"
a technique used for many years by software engineers.

## Implementation  

Clean Architecture is divided into four layers: 

- Entities 
- Repositories 
- Use Cases 
- Controller and Delivery 

## Entity Layer

The first layer that we need to understand is the entity layer. It is the
layer where we put our interfaces, data type, enum, and everything else we
know about the data. 

## Repository Layer 

The Repository layer is where the app communicates to the outside world. In
this layer, we can put functions to call the RESTful API Service from the
back-end app. 

## Controller Layer 

This is the layer where we apply logic to our data or state before the data
goes to the delivery layer.  
All data, state changes, and logic should be controlled from here.

## Delivery Layer 

The Delivery layer is for handling presentations or UI. 

In Clean Architecture, the delivery layer focuses on getting data from the
Use Case layer without making any changes. In this part, we are changing the
state between the "loading," "empty," and "filled" states. 

## Unit Test 

Clean Architecture makes unit testing more accessible, as easy as mocking
interfaces to get the desired data. 

## Resources

- [Implementing a Clean Architecture Modular Application in Nuxt/Vue Typescript — Part 1: Domain Layer](https://dirodriguezm.medium.com/implementing-a-clean-architecture-modular-application-in-nuxt-vue-typescript-part-1-domain-layer-ca721f266a58)
- [The Benefits of Using Clean Architecture in Vue: Article](https://www.mitrais.com/news-updates/the-benefits-of-using-clean-architecture-in-vue/)
- [The Benefits of Using Clean Architecture in Vue: Repository](https://github.com/satria1697/vigilant-octo-guide)
- [Building a data layer with Vue and Composition API](https://javascript.plainenglish.io/building-a-data-layer-with-vue-and-composition-api-547cc9761b4c)
- [Improve React Component Maintainability with Layered Architecture](https://blog.bitsrc.io/improve-react-component-maintainability-with-layered-architecture-25e74ba86430)
- [Managing API layers in Vue.js with TypeScript](https://dev.to/blindkai/managing-api-layers-in-vue-js-with-typescript-hno)
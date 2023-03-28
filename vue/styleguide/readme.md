# Styleguide

## Basic rules

- Each component should be defined in its dedicated file
- Single file components should be named in the PascalCase or kebab-case
- Base components should start with the same prefix: `Base` or `V`
- Keep components small and focused:

  Each component should have a clear and specific purpose. Avoid creating components that are too large or that have multiple responsibilities.

- Use props and events to communicate between components:

  Use props to pass data from parent components to child components, and events to emit data from child components to parent components.

- Use slots for flexibility:
  
  Use slots to allow the content of a component to be customized by the parent component.

- With more than one attribute, all attributes should be on a new line:

  ```vue
  <button
    class="button button--secondary"
    type="button"
  >
    Confirm
  </button>
  ```

- Always use double quotes `"` inside templates and single quotes `'` for all other JS/TS:

- Default key should be provided if the prop is not required:

  ```vue
  interface Props {
    autoHide?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    autoHide: false,
  });
  ```

- Shorthand `@` is preferable over `v-on`:

- Use shorthand for directives:

  - `@` is short for `v-on`

    ```vue
    <form @submit.prevent="handleSubmit">
      <!-- ... -->
    </form>
    ```

  - `:` is short for `v-bind`
  
    ```vue
    <app-header :auto-hide="false" />
    ```
  
  - `#` is short for `v-slot`

    ```vue
    <v-input-email>
      <template #error="{ errorMessage }">
        <p class="text-negative">{{ errorMessage }}</p>
      </template>
    </v-input-email>
    ```

- Prefer self-closing component tags:

  ```vue
  <app-header />
  ```

- Block order in `.vue` file:

  ```vue
  <script setup lang="ts">
    // ...
  </script>

  <template>
    // ...
  </template>

  <style scoped>
    // ...
  </style>
  ```

## Naming

- The component name should always consist of multiple words to avoid conflicts with existing or future HTML elements
- Tightly coupled child components should be prefixed with their parent component’s name:

  ```txt
  TodoList
  TodoListItem
  ```

- Component names should begin with the foremost top-level (usually general) words and end with the foremost specific:

  ```txt
  SearchWidget
  SearchWidgetInput
  SearchWidgetResultsList
  ```

- Use PascalCase or kebab-case for components:

  ```vue
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
  ```

- Use kebab-case  to provide props in templates.

  ```vue
  <app-header auto-hide />
  ```

- Use kebab-case for events:

  ```vue
  <template>
    <popup-window @close-window="closePopup" />
  </template>
  ```

- 

- 

- 

- 

## Code splitting

- Use dynamic imports:

  Use the dynamic `import()` syntax to load components or modules on demand when they are needed.
  This allows you to split your code into smaller chunks that are only loaded when they are needed,
  improving performance by reducing the initial load time of the application.

- Use the Vue.js async component:

  The Vue.js async component allows you to lazy load components on demand, reducing the initial load
  time of your application.

- Use the Vue.js router:

  The Vue.js router allows you to define routes for your application and lazy load the components
  associated with those routes. This means that components are only loaded when the route is accessed,
  improving the performance of your application.

## Linting and formatting

- Use ESLint
- Use Prettier
- Configure your linting and formatting rules:

  Configure your ESLint and Prettier rules to enforce the code style and consistency you want to achieve
  in your Vue.js project.

- Integrate linting and formatting into your development process:

  Integrate your linting and formatting tools into your development process by adding them to your code
  editor or build pipeline. This can help you catch errors and enforce consistency before code is committed
  to your version control system.

- Use a pre-commit hook:

  Use a pre-commit hook to run your linting and formatting tools automatically before code is committed to
  your version control system. This can help ensure that your code meets your team’s standards and prevents
  errors from being committed to your repository.

## Composition api

- Use `reactive` for Object, Array, Map, Set

- Use `ref` for String, Number, Boolean

## Styling

- Use scoped CSS:

  It is a good idea to have general styles or frameworks linked in your App.vue without scope and to use
  scoped CSS for everything else.

- Use BEM:

  Even if you scope your CSS, you should use BEM. BEM allows you to actually delete CSS with confidence
  and guarantees your stylesheets’ health. Methodologies like BEM are an industry standard for a reason.

## Documentation

- Use JSDoc
- Document your components:

  When creating components, document their props, events, and slots.

- Document your Vuex/Pinia stores:

  If you’re using Vuex to manage the state of your Vue.js project, document your store by adding comments
  that explain the purpose of each module, state, mutation, and action.

- Write clear and concise comments

- Use README files:

  Write README files for each module, component, or feature in your Vue.js project. These files can provide
  an overview of what the module or feature does and how to use it.

## Module based development

Always construct your app out of small modules which do one thing and do it well.

---

## Component names

Each component name must be:

- **Meaningful**: not over specific, not overly abstract.
- **Short**: 2 or 3 words.
- **Pronounceable**: we want to be able to talk about them.

Why?

- The name is used to communicate about the component. So it must be short, meaningful and pronounceable.

How?

```html
<!-- recommended -->
<app-header></app-header>
<user-list></user-list>
<range-slider></range-slider>

<!-- avoid -->
<btn-group></btn-group> <!-- short, but unpronounceable. use `button-group` instead -->
<ui-slider></ui-slider> <!-- all components are ui elements, so is meaningless -->
<slider></slider> <!-- not custom element spec compliant -->
```

---

## Keep component expressions simple

Vue.js's inline expressions are 100% Javascript. This makes them extremely powerful,
but potentially also very complex. Therefore you should keep expressions simple.

Why?

- Complex inline expressions are hard to read.
- Inline expressions can't be reused elsewhere. This can lead to code duplication and code rot.
- IDEs typically don't have support for expression syntax, so your IDE can't autocomplete or validate.

How

- If it gets too complex or hard to read move it to methods or computed properties!

---

## Component structure

Make it easy to reason and follow a sequence of thoughts.

Why?

- Having the component export a clear and grouped object, makes the code easy to read
and easier for developers to have a code standard.
- Again, grouping makes the component easier to read (name; extends; props, data and computed;
components; watch and methods; lifecycle methods, etc.);
- Use the name attribute. Using vue devtools and that attribute will make your development/testing easier;
- Use a CSS naming Methodology, like BEM;
- Use the script-template-style .vue file organization.

---

## Component event names

Vue.js provides all Vue handler functions and expressions are strictly bound to the ViewModel.
Each component events should follow a good naming style that will avoid issues during the development.

Why?

- Developers are free to use native likes event names and it can cause confusion down the line;
- The freedom of naming events can lead to a DOM templates incompatibility;

How?

- Event names should be kebab-cased;
- A unique event name should be fired for unique actions in your component that will be of interest
to the outside world, like: upload-success, upload-error or even dropzone-upload-success, dropzone-upload-error
(if you see the need for having a scoped prefix);
- Events should either end in verbs in the infinitive form (e.g. client-api-load) or nouns (e.g drive-upload-success).

---

## Use component name as style scope

Vue.js component elements are custom elements which can very well be used as style scope root.
Alternatively the component name can be used as CSS class namespace.

Why?

- Scoping styles to a component element improves predictability as its prevents styles
leaking outside the component element.
- Using the same name for the module directory, the Vue.js component and the style root
makes it easy for developers to understand they belong together.

How?

- Use the component name as a namespace prefix based on **BEM** and **OOCSS** and use the scoped
attribute on your style class. The use of **scoped** will tell your Vue compiler to add a signature
on every class that your `<style>` have.

---

## Document your component API

A Vue.js component instance is created by using the component element inside your application.
The instance is configured through its custom attributes. For the component to be used by other
developers, these custom attributes - the component's API - should be documented in a README.md file.

Why?

- Documentation provides developers with a high level overview to a component, without the need to go
through all its code. This makes a component more accessible and easier to use.
- A component's API is the set of custom attributes through which its configured. Therefore these are
especially of interest to other developers which only want to consume (and not develop) the component.
- Documentation formalises the API and tells developers which functionality to keep backwards compatible
when modifying the component's code.
- README.md is the de facto standard filename for documentation to be read first. Code repository hosting
services (Github, Bitbucket, Gitlab etc) display the contents of the README's, directly when browsing through
source directories. This applies to our module directories as well.

How?

- Add a README.md file to the component's module directory;
- Within the README file, describe the functionality and the usage of the module. For a vue component
its most useful to describe the custom attributes it supports as those are its API.

## Resources

- [Style Guide](https://vuejs.org/style-guide/)
- [Vue.js Component Style Guide](https://github.com/pablohpsilva/vuejs-component-style-guide)
- [Good Ways To Organize Large Vue.js Project](https://medium.com/@nile.bits/good-ways-to-organize-large-vue-js-project-a38e557c9876)
- [Building an application with Vue and TypeScript. Best practices, thoughts and recommendations.](https://stefan-bauer.online/building-an-application-with-vue-and-type-script-best-practices-thoughts-and-recommendations/)
- [10 Mistakes to Avoid When Starting with Vue 3](https://fadamakis.com/10-mistakes-to-avoid-when-starting-with-vue-3-1d1ced8552ae)
- [Vue.js style guide | GitLab](https://docs.gitlab.com/ee/development/fe_guide/style/vue.html)
- [12 VueJS Best Practices for Pro Developers](https://learnvue.co/articles/vue-best-practices)
- [Vue.js Best Practices: Here’s How To Craft Highly Modular Applications](https://www.bacancytechnology.com/blog/vue-js-best-practices)

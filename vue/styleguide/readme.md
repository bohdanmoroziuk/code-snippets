# Styleguide

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

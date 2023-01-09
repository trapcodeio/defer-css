### Defer Css

Simple LightWeight function to defer css in your web applications or websites.

**DEMO**: [stackblitz.com](https://stackblitz.com/edit/defer-css-demo?file=index.html)

It's 2023 and there is still a need to defer CSS yourself. One would think that with all the frameworks and libraries
out there, this would be a solved problem.
But it's not. This is a simple plugin that will help you defer your CSS.

##### Why or when should I use this plugin?

There are some styles that are not needed for the initial page load.
A good list of these styles are:

- Fonts
- Icons
- AnimateCSS

With this plugin you can defer these styles and load them when they are needed.

##### Do I need this if am I using a framework like angular, react or vue?

Yes, you do. Most frameworks have a way to defer CSS, but they are not perfect.
You don't get to decide when to load the CSS. You can only decide if you want to load it or not in the component.



## Direct Browser Installation

```html
<!--Using JsDeliver CDN-->
<script src="https://cdn.jsdelivr.net/npm/defer-css"></script>

<!-- Or Using UnPkg CDN-->
<script src="https://unpkg.com/defer-css"></script>

<!-- Example Script -->
<script>
  const { deferCss } = window;
</script>
```

## Using Package Managers

```shell
npm i defer-css
# or using yarn
yarn add defer-css
```

Import the package in your project

```typescript
import { deferCss } from 'defer-css';
```

## Example Usage


```html

<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/defer-css"></script>

  <!-- Styles will be placed before this element-->
  <link id="defer-css" />
  <!--  OR   -->
  <link id="custom-id" />
</head>
</html>
```

The deferCss function takes two arguments, the first is the path/paths to the css file and the second is the id of the element to place the styles before.

The default id is `defer-css` but you can change it to any id you want by passing it as the second argument.

```javascript
// Using a string
deferCss("/style-1.min.css");

// Using a single object
deferCss({ href: "/style-2.min.css", crossOrigin: "anonymous" });

// using a mix of string and object in an array
const styles = [
    "/style-3.min.css",
    { href: "/style-4.min.css", crossOrigin: "anonymous" }, 
];

deferCss(styles, "custom-id");
```

Result:

```html

<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/defer-css"></script>
  
  <link rel="stylesheet" href="/style-1.min.css" />
  <link rel="stylesheet" href="/style-2.min.css" crossorigin="anonymous" />
  <link id="defer-css" />
  
  <link rel="stylesheet" href="/style-3.min.css" />
  <link rel="stylesheet" href="/style-4.min.css" crossorigin="anonymous" />
  <link id="custom-id">
</head>
```

If a link object includes an `onDefer` function, it is executed when the css file is loaded.

```javascript
deferCss([
  {
    href: 'style-1.min.css',
    onDefer: function() {
      // do something
    }
  },
])
```

#### Multiple deferCss

Let's say you want to mount css in multiple places.

```html

<head>
  <link id="main-css">
  <style>
    .some-style-before-other-css {
      background: teal;
    }
  </style>
  <link id="other-css">
</head>
```

```javascript
deferCss(['main-css-1.css', 'main-css-2.css'], 'main-css');
deferCss([
  { href: 'other-css-1.css', crossOrigin: 'anonymous' },
  'other-css-2.css'
], 'other-css');
```

This will result to.

```html

<link rel="stylesheet" href="main-css-1.css">
<link rel="stylesheet" href="main-css-2.css">
<style>
  .some-style-before-other-css {
    background: teal;
  }
</style>
<link rel="stylesheet" href="other-css-1.css" crossorigin="anonymous">
<link rel="stylesheet" href="other-css-2.css">
```

#### DeferCssData

The `deferCssData` includes details you may need.

```javascript
({
  // Element mounted on, default = 'defer-css'
  "defer-css": {
    total: Number, // total number of css defined
    loaded: Number // total number of css loaded (at the moment)
  }
});
```

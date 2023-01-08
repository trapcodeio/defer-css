### Defer Css

Simple LightWeight function to defer css in your web applications or websites.

**DEMO**: [Jsfiddle.net](https://jsfiddle.net/trapcode/j8vsg7az/)

Two **functions** and one **object** is set to global `window`

| Function      | Arguments                             | Usage                                                                                                                                                     |
|---------------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| deferCss      | `(scripts=[], mountOnId='defer-css')` | For loading a style or array of styles                                                                                                                    |
| hasStyleSheet | `(search='', return=false)`           | A bonus helper function for checking if the browser has loaded a particular stylesheet using `document.styleSheets`                                       |
|               |                                       | if `$return` is "all" the `CSSStyleSheet` Object is returned, else if any string we assume its a key in the `CSSStyleSheet` object you are trying to get. |

#### Direct Browser Installation
```html
<!--Using JsDeliver CDN-->
<script src="https://cdn.jsdelivr.net/npm/defer-css"></script>

<!-- Or Using UnPkg CDN-->
<script src="https://unpkg.com/defer-css"></script>
```
#### From Package Managers
You can include `defer-css` in your project using `require` or `import` but defer-css does not export anything.

It sets `window.deferCss`, `window.deferCssData` && `window.hasStyleSheet`


#### Usage
Defined styles are loaded before any element with id `defer-css` id in your page
```html
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/defer-css"></script>
        <!-- Styles will be placed before this element-->
        <link id="defer-css"/>
    </head>
</html>
```

You can change this to your custom id
```html
<head>
    <!-- Some Styles  -->
    <link href="....">
    <link href="....">
    <link href="....">
    
    <!-- Styles will be placed before this add-css-here element-->
    <link id="add-css-here"/>
</head>
```

Load Css using javascript
```javascript
deferCss([
    'style-1.min.css',
    {href: 'style-2.min.css', crossOrigin: 'anonymous'}
], 'add-css-here')
```

Adds the following styles
```html
    <link rel="stylesheet" href="style-1.min.css">
    <link rel="stylesheet" href="style-2.min.css" crossorigin="anonymous">
```

The values of the styles array can either be a url `string` or an `object` that will be used to build your `link` element

If the object includes an `onDefer` function, it is executed when the css file is loaded.
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
Lets say you want to mount css in multiple places.
```html
<head>
    <link id="main-css">
    <style>
        .some-style-before-other-css{
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
        .some-style-before-other-css{
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

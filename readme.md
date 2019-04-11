### Defer Css

A simple function to defer css in your html tag.

#### Direct Browser Installation
```html
<!--Using JsDeliver CDN-->
<script src="https://cdn.jsdelivr.net/npm/defer-css"></script>

<!-- Or Using UnPkg CDN-->
<script src="https://unpkg.com/defer-css"></script>

<!-- Or Using Bundle.run-->
<script src="https://bundle.run/defer-css"></script>
```
#### From Package Managers
You can include using `require` or `import` but defer-css does not export anything.

It sets `window.deferCss` && `window.deferCssData`


#### Usage
Defined styles are loaded before the link element with `defer-css` id in your page
```html
<html>
    <head>
        <!-- Styles will be placed before this link element-->
        <link id="defer-css"/>
    </head>
</html>
```

You can change this to your custom id
```html
<head>
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
    {href: 'style-2.min.css', crossorigin: 'anonymous'}
], 'add-css-here')
```

Adds the following styles
```html
    <link rel="stylesheet" href="style-1.min.css" crossorigin="anonymous">
    <link rel="stylesheet" href="style-2.min.css" crossorigin="anonymous">
```

The values of the styles array can either be a url `string` or an `object` that will be used to build your `link` element

If the object includes an `onload` function, it is executed when the css file is loaded.
```javascript
deferCss([
    {
        href: 'style-1.min.css', 
        onload: function() {
            // do something
        }
    },
])
```

#### Multiple deferCss
Lets say you want to mount css in multiple places.
```html
<head>
    <link id="main-css"></main-css>
    <link id="other-css"></other-css>
</head>
```

```javascript
deferCss(['main-css-1.css', 'main-css-2.css'], 'main-css');
deferCss(['other-css-1.css', 'other-css-2.css'], 'other-css');
```

The `deferCssData` includes details you may need.
```javascript
 deferCssData = {
    // Element mounted on, default = 'link'
    link: {
        total: 1, // total number of css loaded
        loaded: 3
    }
}
```
##### Example
```html
<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Defer Css Test</title>
    <script src="https://cdn.jsdelivr.net/npm/defer-css"></script>
    <!-- Links are placed before this element -->
    <link id="add-css-here">
</head>
<body>

<div class="container">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="card shadow" style="margin-top: 20vh">
                <div class="card-body text-center">
                    <h1>Hello, world!</h1>
                    <h5 class="text-primary">
                        Bootstrap Loaded with defer-css
                    </h5>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    let scripts = [
        'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        // Style with onload
        {
            href: './app.css',
            onload: function () {
                console.log(this.href + ' Style Loaded!');
                // value of deferCssData
                console.log(deferCssData);
            }
        },
    ];

    // Defer scripts
    deferCss(scripts, 'add-css-here');
</script>
</body>
</html>
```

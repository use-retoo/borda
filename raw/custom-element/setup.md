# Setup

> Register the custom element with defineBordaElement() and connect styles.

The `<borda-tour-widget>` custom element must be registered before use by calling `defineBordaElement()`. Calling it more than once has no effect.

```ts [setup.ts]
import { defineBordaElement } from '@retoo/borda';

import '@retoo/borda/styles';

defineBordaElement();
```

After registration, `<borda-tour-widget>` is available in the DOM like any native HTML element.

## UMD

When using a script tag instead of a bundler, the registration function is on `window`:

```html [index.html]
<head>
  <link rel="stylesheet" href="https://unpkg.com/@retoo/borda/dist/borda.css" />
</head>
<body>
  <script src="https://unpkg.com/@retoo/borda/dist/borda.umd.js"></script>
  <script>
    window.defineBordaElement();
  </script>
</body>
```

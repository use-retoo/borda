# Formats

> Available build formats — ES Module, UMD, CommonJS, and their minified variants.

Borda is distributed in three module formats. Each format has a development build (readable, with comments) and a minified production build. All variants export the same API surface — the difference is how the module is loaded by the consumer.

## ES Module

The recommended format for projects using a bundler (Vite, Webpack 5+, Rollup, esbuild). ES Modules support static analysis, tree-shaking, and modern `import`/`export` syntax.

<table>
<thead>
  <tr>
    <th>
      File
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        borda.es.js
      </code>
    </td>
    
    <td>
      Development build — unminified, suitable for debugging
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        borda.min.es.js
      </code>
    </td>
    
    <td>
      Production build — minified and optimized
    </td>
  </tr>
</tbody>
</table>

The `main` and `module` fields in `package.json` point to this build, so bundlers resolve it automatically.

```ts [main.ts]
import { useBorda } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();
```

## UMD

Universal Module Definition — works via `<script>` tags in the browser, AMD loaders, and CommonJS `require()`. Use this for environments without a bundler: static HTML pages, WordPress, Webflow, Squarespace, or any CMS that allows custom scripts.

<table>
<thead>
  <tr>
    <th>
      File
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        borda.umd.js
      </code>
    </td>
    
    <td>
      Development build
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        borda.min.umd.js
      </code>
    </td>
    
    <td>
      Production build
    </td>
  </tr>
</tbody>
</table>

```html [index.html]
<link rel="stylesheet" href="https://unpkg.com/@retoo/borda/dist/borda.css" />
<script src="https://unpkg.com/@retoo/borda/dist/borda.min.umd.js"></script>
<script>
  const borda = window.bordaWidget();

  borda.mount({
    steps: [
      {
        target: '#element',
        title: 'Welcome',
        description: 'Getting started.',
        placement: 'bottom-center',
      },
    ],
  });
</script>
```

<callout icon="i-lucide-alert-triangle" color="warning">

In UMD mode, the factory function is exposed directly as `window.bordaWidget()` — no need to access a namespace object.

</callout>

## CommonJS

For Node.js environments, SSR frameworks, or legacy build systems that use `require()`.

<table>
<thead>
  <tr>
    <th>
      File
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        borda.cjs.js
      </code>
    </td>
    
    <td>
      Development build
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        borda.min.cjs.js
      </code>
    </td>
    
    <td>
      Production build
    </td>
  </tr>
</tbody>
</table>

```js [server.js]
const { useBorda } = require('@retoo/borda');

const borda = useBorda();
```

## Custom Element

Register Borda as a native Web Component to use it in any framework — or vanilla HTML:

<steps>

### Register the element

```ts [setup.ts]
import { defineBordaElement } from '@retoo/borda';

import '@retoo/borda/styles';

defineBordaElement();
```

### Use in HTML

```html [page.html]
<borda-tour-widget></borda-tour-widget>
```

</steps>

<callout icon="i-lucide-arrow-right" to="/custom-element/setup">

For detailed Custom Element docs — framework integration, attributes, and lifecycle — see the **Custom Element** section.

</callout>

## Stylesheets

CSS must be imported separately regardless of the JS format. Without styles, the widget mounts into the DOM but renders without any visual appearance.

<table>
<thead>
  <tr>
    <th>
      Import path
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        @retoo/borda/styles
      </code>
    </td>
    
    <td>
      Development build — unminified, with source maps
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        @retoo/borda/styles/min
      </code>
    </td>
    
    <td>
      Production build — minified
    </td>
  </tr>
</tbody>
</table>

```ts
// ES Module / bundler
import '@retoo/borda/styles';        // dev
import '@retoo/borda/styles/min';    // prod
```

```html
<!-- UMD / script tag -->
<link rel="stylesheet" href="https://unpkg.com/@retoo/borda/dist/borda.css" />
```

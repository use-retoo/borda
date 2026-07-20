# Bundle Size

> Size of each distribution format and tree-shaking capabilities.

The production bundle (minified JS + CSS) weighs **~42 KB gzipped**. Borda has no runtime dependencies and loads nothing beyond the assets you provide.

## Distribution files

Each module format ships in two variants: a minified production build and an unminified development build with readable code and comments.

<table>
<thead>
  <tr>
    <th>
      File
    </th>
    
    <th>
      Format
    </th>
    
    <th>
      Raw
    </th>
    
    <th>
      Gzip
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        borda.min.es.js
      </code>
    </td>
    
    <td>
      ES Module
    </td>
    
    <td>
      134.61 KB
    </td>
    
    <td>
      37.49 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        borda.min.umd.js
      </code>
    </td>
    
    <td>
      UMD
    </td>
    
    <td>
      139.65 KB
    </td>
    
    <td>
      37.89 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        borda.min.cjs.js
      </code>
    </td>
    
    <td>
      CommonJS
    </td>
    
    <td>
      134.95 KB
    </td>
    
    <td>
      37.53 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        borda.es.js
      </code>
    </td>
    
    <td>
      ES Module
    </td>
    
    <td>
      318.88 KB
    </td>
    
    <td>
      76.31 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        borda.umd.js
      </code>
    </td>
    
    <td>
      UMD
    </td>
    
    <td>
      330.01 KB
    </td>
    
    <td>
      77.16 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        borda.cjs.js
      </code>
    </td>
    
    <td>
      CommonJS
    </td>
    
    <td>
      320.07 KB
    </td>
    
    <td>
      76.46 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        borda.css
      </code>
    </td>
    
    <td>
      CSS
    </td>
    
    <td>
      28.03 KB
    </td>
    
    <td>
      4.12 KB
    </td>
  </tr>
</tbody>
</table>

## Tree-shaking

The ES Module build supports tree-shaking. If your bundler detects unused exports, they are removed from the final output. In practice, this means projects that only use a subset of Borda's API can produce smaller bundles than the numbers above.

<callout color="info">

The numbers above are for the full library with all components. Tree-shaking with ES Module imports can reduce the JavaScript payload for projects that only use a subset of features.

</callout>

## What's included

The bundle contains:

- Svelte 5 runtime (minimal, compiled away in most cases)
- Tour controller and step navigation logic
- Spotlight overlay with SVG cutout
- Tooltip positioning engine with auto-flip
- Keyboard navigation handler
- Touch swipe navigation handler
- Event bus
- Responsive breakpoint system
- Scroll animation engine
- Skip persistence layer
- All UI components (buttons, progress, image, close button)

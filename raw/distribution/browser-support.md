# Browser Support

> Supported browsers, required polyfills, and compatibility notes.

Borda targets modern browsers that support ES2020+. The compiled output uses `async`/`await`, optional chaining, nullish coalescing, and `IntersectionObserver` — all available in current versions of major browsers without polyfills.

## Supported browsers

<table>
<thead>
  <tr>
    <th>
      Browser
    </th>
    
    <th>
      Minimum version
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Chrome
    </td>
    
    <td>
      80+
    </td>
  </tr>
  
  <tr>
    <td>
      Firefox
    </td>
    
    <td>
      80+
    </td>
  </tr>
  
  <tr>
    <td>
      Safari
    </td>
    
    <td>
      14+
    </td>
  </tr>
  
  <tr>
    <td>
      Edge
    </td>
    
    <td>
      80+ (Chromium-based)
    </td>
  </tr>
  
  <tr>
    <td>
      Opera
    </td>
    
    <td>
      67+
    </td>
  </tr>
  
  <tr>
    <td>
      Samsung Internet
    </td>
    
    <td>
      13+
    </td>
  </tr>
</tbody>
</table>

## Required Web APIs

Borda relies on the following browser APIs at runtime:

<table>
<thead>
  <tr>
    <th>
      API
    </th>
    
    <th>
      Used for
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        IntersectionObserver
      </code>
    </td>
    
    <td>
      Detecting target element visibility for spotlight positioning
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ResizeObserver
      </code>
    </td>
    
    <td>
      Adapting tooltip and overlay layout when the container resizes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customElements
      </code>
    </td>
    
    <td>
      Custom Element registration (<code>
        defineBordaElement()
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        matchMedia
      </code>
    </td>
    
    <td>
      Responsive breakpoint detection
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        CSS Custom Properties
      </code>
    </td>
    
    <td>
      Theming and dynamic style overrides
    </td>
  </tr>
</tbody>
</table>

All listed APIs are supported in the browsers above. If you need to support older browsers, include the corresponding polyfills before loading Borda.

## Internet Explorer

Internet Explorer is not supported. Borda uses ES Module syntax, CSS custom properties, and modern DOM APIs that have no IE equivalents.

## Mobile browsers

Borda works on mobile Chrome, Safari (iOS), Firefox, and Samsung Internet. The spotlight overlay, tooltip positioning, and keyboard navigation all work on touch devices. Keyboard navigation is optional and can be disabled via `tour.hasKeyboardControl: false`.

## Node.js

For SSR or prerendering scenarios, Borda requires Node.js 16.0 or later. The CommonJS build is available for `require()` usage. Note that actual tour rendering requires a browser DOM — the Node.js build is intended for server-side mounting logic and config preparation.

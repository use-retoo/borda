# Overview

> Keyboard navigation, focus management, and ARIA support built into the widget.

Borda is accessible out of the box: every interactive element is keyboard-operable, exposes ARIA roles and attributes, and keeps a visible focus indicator. No extra configuration is required.

## Keyboard navigation

<table>
<thead>
  <tr>
    <th>
      Element
    </th>
    
    <th>
      Keys
    </th>
    
    <th>
      Action
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Tour active
    </td>
    
    <td>
      <code>
        ArrowRight
      </code>
    </td>
    
    <td>
      Next step
    </td>
  </tr>
  
  <tr>
    <td>
      Tour active
    </td>
    
    <td>
      <code>
        ArrowLeft
      </code>
    </td>
    
    <td>
      Previous step
    </td>
  </tr>
  
  <tr>
    <td>
      Tour active
    </td>
    
    <td>
      <code>
        Escape
      </code>
    </td>
    
    <td>
      Close the tour
    </td>
  </tr>
  
  <tr>
    <td>
      Buttons
    </td>
    
    <td>
      <code>
        Enter
      </code>
      
       / <code>
        Space
      </code>
    </td>
    
    <td>
      Activate (next, prev, finish, skip, close)
    </td>
  </tr>
  
  <tr>
    <td>
      Overlay
    </td>
    
    <td>
      <code>
        Enter
      </code>
      
       / <code>
        Space
      </code>
    </td>
    
    <td>
      Close on backdrop click
    </td>
  </tr>
  
  <tr>
    <td>
      Skip checkbox
    </td>
    
    <td>
      <code>
        Enter
      </code>
      
       / <code>
        Space
      </code>
    </td>
    
    <td>
      Toggle checkbox
    </td>
  </tr>
</tbody>
</table>

Keyboard control is enabled by default. Disable it with `tour.hasKeyboardControl: false`.

```ts
await borda.mount({
  steps: [...],
  tour: {
    hasKeyboardControl: false,
  },
});
```

## Focus management

When the tour mounts, focus moves to the first interactive element within the tooltip. The focus trap keeps tab navigation within the active tooltip, overlay close button, and skip checkbox — users cannot tab to elements behind the overlay.

When the tour closes or finishes, focus returns to the previously focused element.

## ARIA attributes

Every interactive component exposes ARIA roles and attributes:

<table>
<thead>
  <tr>
    <th>
      Component
    </th>
    
    <th>
      ARIA
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Tooltip
    </td>
    
    <td>
      <code>
        role="dialog"
      </code>
      
      , <code>
        aria-labelledby
      </code>
      
      , <code>
        aria-describedby
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Overlay
    </td>
    
    <td>
      <code>
        aria-hidden="true"
      </code>
      
       on backdrop
    </td>
  </tr>
  
  <tr>
    <td>
      Buttons
    </td>
    
    <td>
      <code>
        role="button"
      </code>
      
      , <code>
        aria-label
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Progress dots
    </td>
    
    <td>
      <code>
        role="tablist"
      </code>
      
      , <code>
        role="tab"
      </code>
      
      , <code>
        aria-selected
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Skip checkbox
    </td>
    
    <td>
      <code>
        role="checkbox"
      </code>
      
      , <code>
        aria-checked
      </code>
    </td>
  </tr>
</tbody>
</table>

Every component accepts an `aria` prop to override or extend its attributes:

```ts
await borda.mount({
  steps: [
    {
      target: '#element',
      title: 'Title',
      description: 'Description',
      placement: 'bottom-center',
    },
  ],
  tourTooltip: {
    aria: {
      ariaLabel: 'Product tour tooltip',
    },
  },
  closeButton: {
    aria: {
      ariaLabel: 'Dismiss tour',
    },
  },
});
```

The available attributes are defined by `ComponentAriaProps`:

```ts
interface ComponentAriaProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaDisabled?: boolean;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaPressed?: ComponentAriaPressed;
  ariaHaspopup?: ComponentAriaHaspopup;
}
```

See the [component pages](/components/overlay) for the `aria` shape each component accepts.

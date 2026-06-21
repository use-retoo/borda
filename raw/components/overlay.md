# Overlay

> Spotlight overlay that highlights the target element with a cutout.

The tour overlay renders a full-screen SVG backdrop with a cutout around the target element. It draws attention to the active step and dims the rest of the page. Pass `false` to disable.

## Config

<table>
<thead>
  <tr>
    <th>
      Property
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Default
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
        padding
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        8
      </code>
    </td>
    
    <td>
      Pixels the cutout extends beyond the target
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        borderRadius
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        8
      </code>
    </td>
    
    <td>
      Corner radius of the cutout in pixels
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isAnimated
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      Whether the spotlight animates between steps
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        hasCloseOnBackdropClick
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      Close the tour when clicking outside the target
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        aria
      </code>
    </td>
    
    <td>
      <code>
        Partial<ComponentAriaProps>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      ARIA attributes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customClasses
      </code>
    </td>
    
    <td>
      <code>
        Partial<BordaTourOverlayComponentClasses>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom CSS classes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customStyles
      </code>
    </td>
    
    <td>
      <code>
        Partial<BordaTourOverlayComponentStyles>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom inline styles
    </td>
  </tr>
</tbody>
</table>

```ts
await borda.mount({
  steps: [
    {
      target: '#sidebar',
      title: 'Navigation',
      description: 'Browse sections here.',
      placement: 'middle-end',
    },
  ],
  tourOverlay: {
    padding: 12,
    borderRadius: 12,
    isAnimated: true,
    hasCloseOnBackdropClick: true,
  },
});
```

## Disabling

```ts
await borda.mount({
  steps: [...],
  tourOverlay: false,
});
```

## Customization

```ts
tourOverlay: {
  customClasses: {
    root: 'my-overlay',
    backdrop: 'opacity-50',
  },
  customStyles: {
    backdrop: {
      fill: 'rgba(0, 0, 0, 0.7)',
    },
  },
}
```

## Interface

```ts
interface BordaTourOverlayProps {
  padding: number;
  borderRadius: number;
  isAnimated: boolean;
  hasCloseOnBackdropClick: boolean;
  aria: Partial<ComponentAriaProps>;
  customClasses: Partial<BordaTourOverlayComponentClasses>;
  customStyles: Partial<BordaTourOverlayComponentStyles>;
}
```

# Close Button

> Button that dismisses the tour before completion.

Close button renders a dismiss control that ends the tour before the user completes all steps. It fires `ON_TOUR_CLOSE` and triggers the close lifecycle. Pass `false` to disable.

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
        size
      </code>
    </td>
    
    <td>
      <code>
        ComponentSize
      </code>
    </td>
    
    <td>
      <code>
        MD
      </code>
    </td>
    
    <td>
      Button size
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        shape
      </code>
    </td>
    
    <td>
      <code>
        ComponentShape
      </code>
    </td>
    
    <td>
      <code>
        CIRCLE
      </code>
    </td>
    
    <td>
      Button shape
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
        Partial<BordaCloseButtonComponentClasses>
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
        Partial<BordaCloseButtonComponentStyles>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom inline styles
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customHtml
      </code>
    </td>
    
    <td>
      <code>
        Partial<BordaCloseButtonComponentHtml>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom HTML for the button
    </td>
  </tr>
</tbody>
</table>

```ts
await borda.mount({
  steps: [...],
  closeButton: {
    size: ComponentSize.SM,
    shape: ComponentShape.CIRCLE,
  },
});
```

## Disabling

```ts
await borda.mount({
  steps: [...],
  closeButton: false,
});
```

## Customization

```ts
closeButton: {
  customClasses: {
    root: 'my-close-wrapper',
    button: 'hover:bg-gray-100',
    cross: 'text-gray-500',
  },
  customStyles: {
    button: {
      width: '28px',
      height: '28px',
    },
  },
}
```

## Interface

```ts
interface BordaCloseButtonProps {
  size: ComponentSize;
  shape: ComponentShape;
  aria: Partial<ComponentAriaProps>;
  customClasses: Partial<BordaCloseButtonComponentClasses>;
  customStyles: Partial<BordaCloseButtonComponentStyles>;
  customHtml: Partial<BordaCloseButtonComponentHtml>;
}
```

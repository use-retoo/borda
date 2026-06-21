# Buttons

> Navigation buttons for prev, next, finish, and skip actions.

Tour buttons provide navigation controls — previous, next, finish (on the last step), and skip. Each button is independently configurable and can be hidden by passing `false`. Pass `false` to the entire component to disable all buttons.

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
      Default size applied to every button; overridable per button
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        prev
      </code>
    </td>
    
    <td>
      <code>
        BordaTourButtonConfig | false
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Previous button config. Pass <code>
        false
      </code>
      
       to hide.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        next
      </code>
    </td>
    
    <td>
      <code>
        BordaTourButtonConfig | false
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Next button config (non-last steps). Pass <code>
        false
      </code>
      
       to hide.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        finish
      </code>
    </td>
    
    <td>
      <code>
        BordaTourButtonConfig | false
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Finish button config (last step). Pass <code>
        false
      </code>
      
       to hide.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        skip
      </code>
    </td>
    
    <td>
      <code>
        BordaTourButtonConfig | false
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Skip button config. Pass <code>
        false
      </code>
      
       to hide.
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
        Partial<BordaTourButtonsComponentClasses>
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
        Partial<BordaTourButtonsComponentStyles>
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
        Partial<BordaTourButtonsComponentHtml>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom inner HTML for each button
    </td>
  </tr>
</tbody>
</table>

Each button config extends `BordaButtonProps` (except `id`) plus a `label` field:

```ts
await borda.mount({
  steps: [...],
  tourButtons: {
    prev: { label: 'Back' },
    next: { label: 'Continue' },
    finish: { label: 'Done!' },
    skip: { label: 'Skip tour' },
  },
});
```

## Hiding individual buttons

```ts
tourButtons: {
  skip: false,    // hide skip button
  prev: false,    // hide prev button
}
```

## Disabling

```ts
await borda.mount({
  steps: [...],
  tourButtons: false,
});
```

## Customization

```ts
tourButtons: {
  customClasses: {
    root: 'my-buttons-bar',
    next: 'bg-blue-600 text-white',
    prev: 'text-gray-500',
  },
  customStyles: {
    root: {
      gap: '12px',
    },
  },
}
```

## Interface

```ts
interface BordaTourButtonsProps {
  size: ComponentSize;
  prev: BordaTourButtonConfig | false;
  next: BordaTourButtonConfig | false;
  finish: BordaTourButtonConfig | false;
  skip: BordaTourButtonConfig | false;
  aria: Partial<ComponentAriaProps>;
  customClasses: Partial<BordaTourButtonsComponentClasses>;
  customStyles: Partial<BordaTourButtonsComponentStyles>;
  customHtml: Partial<BordaTourButtonsComponentHtml>;
}
```

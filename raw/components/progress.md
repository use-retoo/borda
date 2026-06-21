# Progress

> Visual progress indicator with dots, text, or line variants.

Tour progress shows the user's position in the tour. Three visual variants are available — `dots`, `text`, and `line`. Pass `false` to disable.

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
        variant
      </code>
    </td>
    
    <td>
      <code>
        BordaTourProgressVariant
      </code>
    </td>
    
    <td>
      <code>
        DOTS
      </code>
    </td>
    
    <td>
      Visual style — <code>
        dots
      </code>
      
      , <code>
        text
      </code>
      
      , or <code>
        line
      </code>
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
        Partial<BordaTourProgressComponentClasses>
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
        Partial<BordaTourProgressComponentStyles>
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
import { BordaTourProgressVariant } from '@retoo/borda';

await borda.mount({
  steps: [...],
  tourProgress: {
    variant: BordaTourProgressVariant.TEXT,
  },
});
```

## Variants

<table>
<thead>
  <tr>
    <th>
      Variant
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
        DOTS
      </code>
    </td>
    
    <td>
      One dot per step, filled for completed steps
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        TEXT
      </code>
    </td>
    
    <td>
      "Step 2 of 5" label
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LINE
      </code>
    </td>
    
    <td>
      Linear progress bar
    </td>
  </tr>
</tbody>
</table>

## Disabling

```ts
await borda.mount({
  steps: [...],
  tourProgress: false,
});
```

## Customization

```ts
tourProgress: {
  variant: BordaTourProgressVariant.DOTS,
  customClasses: {
    root: 'my-progress',
    item: 'w-2 h-2 rounded-full',
  },
}
```

## Interface

```ts
interface BordaTourProgressProps {
  variant: BordaTourProgressVariant;
  aria: Partial<ComponentAriaProps>;
  customClasses: Partial<BordaTourProgressComponentClasses>;
  customStyles: Partial<BordaTourProgressComponentStyles>;
}
```

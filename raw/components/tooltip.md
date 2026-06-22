# Tooltip

> Positioned tooltip with title, description, arrow, and auto-flip placement.

The tour tooltip displays the step's title and description in a positioned card with an optional arrow pointing at the target. It auto-flips to stay within the viewport and never overlaps the target. Pass `false` to disable.

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
      Size variant scaling padding, gap, min-width and font sizes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        placement
      </code>
    </td>
    
    <td>
      <code>
        ComponentPlacement
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Tooltip placement relative to the target
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        autoPlacement
      </code>
    </td>
    
    <td>
      <code>
        BordaTourTooltipAutoPlacement | boolean
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      Auto-flip when placement doesn't fit
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        margin
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        16
      </code>
    </td>
    
    <td>
      Minimum gap from viewport edges
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        offset
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
      Gap between tooltip and target in pixels
    </td>
  </tr>
  
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
        12
      </code>
    </td>
    
    <td>
      Inner padding in pixels
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        arrow
      </code>
    </td>
    
    <td>
      <code>
        BordaTourTooltipArrowProps | false
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Arrow config. Pass <code>
        false
      </code>
      
       to hide.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        animation
      </code>
    </td>
    
    <td>
      <code>
        BordaTourTooltipAnimation | false
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Enter/exit animation settings
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        hasGlide
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Whether the tooltip glides its position between steps
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isHidden
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Whether the tooltip is currently hidden
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
        Partial<BordaTourTooltipComponentClasses>
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
        customHtml
      </code>
    </td>
    
    <td>
      <code>
        Partial<BordaTourTooltipComponentHtml>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom inner HTML for title/description
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
        Partial<BordaTourTooltipComponentStyles>
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
      target: '#element',
      title: 'Title',
      description: 'Description text.',
      placement: 'bottom-center',
    },
  ],
  tourTooltip: {
    offset: 12,
    margin: 20,
    arrow: { placement: 'top-center' },
    autoPlacement: true,
  },
});
```

## Customization

```ts
tourTooltip: {
  customClasses: {
    root: 'shadow-xl rounded-2xl',
    title: 'text-lg font-semibold',
    description: 'text-sm text-gray-500',
  },
  customStyles: {
    root: {
      maxWidth: '360px',
    },
  },
}
```

Replace the tooltip content entirely with `customHtml`:

```ts
tourTooltip: {
  customHtml: {
    title: '<strong>Custom title</strong>',
    description: '<em>Custom description</em>',
  },
}
```

## Interface

```ts
interface BordaTourTooltipProps {
  size: ComponentSize;
  placement: ComponentPlacement;
  offset: number;
  margin: number;
  padding: number;
  arrow: BordaTourTooltipArrowProps | false;
  autoPlacement: BordaTourTooltipAutoPlacement | boolean;
  isHidden: boolean;
  hasGlide: boolean;
  animation: BordaTourTooltipAnimation | false;
  aria: Partial<ComponentAriaProps>;
  customClasses: Partial<BordaTourTooltipComponentClasses>;
  customStyles: Partial<BordaTourTooltipComponentStyles>;
  customHtml: Partial<BordaTourTooltipComponentHtml>;
}
```

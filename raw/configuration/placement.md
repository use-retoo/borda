# Placement

> Control tooltip position relative to the target element using ComponentPlacement.

<div id="placement-description">

The `placement` field on each step controls where the tooltip appears relative to its target element. Borda uses a 3×3 grid system with 9 named positions.

</div>

## Values

<table>
<thead>
  <tr>
    <th>
      Placement
    </th>
    
    <th>
      Position
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        TOP_START
      </code>
    </td>
    
    <td>
      Above the target, aligned to its left edge
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        TOP_CENTER
      </code>
    </td>
    
    <td>
      Above the target, centered
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        TOP_END
      </code>
    </td>
    
    <td>
      Above the target, aligned to its right edge
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        MIDDLE_START
      </code>
    </td>
    
    <td>
      Left of the target, vertically centered
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        MIDDLE_CENTER
      </code>
    </td>
    
    <td>
      Centered on the target
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        MIDDLE_END
      </code>
    </td>
    
    <td>
      Right of the target, vertically centered
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        BOTTOM_START
      </code>
    </td>
    
    <td>
      Below the target, aligned to its left edge
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        BOTTOM_CENTER
      </code>
    </td>
    
    <td>
      Below the target, centered
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        BOTTOM_END
      </code>
    </td>
    
    <td>
      Below the target, aligned to its right edge
    </td>
  </tr>
</tbody>
</table>

<borda-container>
<borda-component :config="{"steps":[{"target":"#placement-description","title":"3×3 grid","description":"Borda uses a 3×3 grid with 9 named positions for tooltip placement.","placement":"bottom-start"},{"target":"#values","title":"Placement values","description":"The table lists all 9 positions — TOP_START through BOTTOM_END.","placement":"middle-end"},{"target":"#auto-placement","title":"Auto-placement","description":"When the requested placement doesn't fit, Borda flips the tooltip to a fallback position.","placement":"top-end"}]}">



</borda-component>
</borda-container>

```ts
import { ComponentPlacement } from '@retoo/borda';

await borda.mount({
  steps: [
    {
      target: '#sidebar',
      title: 'Navigation',
      description: 'Browse sections here.',
      placement: ComponentPlacement.MIDDLE_END,
    },
    {
      target: '#header',
      title: 'Header',
      description: 'Sits below the target, aligned left.',
      placement: ComponentPlacement.BOTTOM_START,
    },
    {
      target: '#hero-banner',
      title: 'Hero',
      description: 'Centered directly on top of the target.',
      placement: ComponentPlacement.MIDDLE_CENTER,
    },
  ],
});
```

## Auto-placement

When the requested placement doesn't fit in the viewport, Borda can automatically flip the tooltip to a fallback position. This is enabled by default. The default fallback chain tries the mirrored side first, then centered variants, then the opposite-alignment sides, and finally the perpendicular (`middle-*`) sides.

<callout color="info">

The tooltip never overlaps its target. If no candidate placement fits the viewport, Borda shifts the least-overflowing one to whichever non-overlapping side has room — even if that means the tooltip ends up partially outside the viewport.

</callout>

Configure the fallback chain through the tooltip's `autoPlacement` option:

```ts
await borda.mount({
  steps: [
    {
      target: '#element',
      title: 'Title',
      description: 'Description',
      placement: ComponentPlacement.TOP_CENTER,
    },
  ],
  tourTooltip: {
    autoPlacement: {
      fallback: [
        ComponentPlacement.BOTTOM_CENTER,
        ComponentPlacement.MIDDLE_END,
      ],
    },
  },
});
```

The first placement from the fallback list that fits in the viewport wins. If none fit, Borda falls back to whichever candidate overflows the least, then shifts it to stay attached to the target without ever overlapping it.

Disable auto-placement to use the requested position as-is:

```ts
tourTooltip: {
  autoPlacement: false,
}
```

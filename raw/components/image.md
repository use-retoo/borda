# Image

> Display an image above the tooltip heading with default or bleed variants.

The tour image renders above the tooltip heading. It supports two visual variants — `default` (inset within tooltip padding) and `bleed` (stretched to tooltip edges, only top corners rounded). Pass `false` to disable.

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
        BordaTourImageVariant
      </code>
    </td>
    
    <td>
      <code>
        DEFAULT
      </code>
    </td>
    
    <td>
      Visual presentation — <code>
        default
      </code>
      
       or <code>
        bleed
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
        Partial<BordaImageCustomClasses>
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
        Partial<BordaImageCustomStyles>
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
        Partial<BordaImageCustomHtml>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom HTML that replaces the image entirely
    </td>
  </tr>
</tbody>
</table>

The image `src` and `alt` come from each step's `image` field, not from the component config.

```ts
import { BordaTourImageVariant } from '@retoo/borda';

await borda.mount({
  steps: [
    {
      target: '#dashboard',
      title: 'Dashboard',
      description: 'Your main overview.',
      image: { src: '/tour/dashboard.png', alt: 'Dashboard overview' },
      placement: 'bottom-center',
    },
  ],
  tourImage: {
    variant: BordaTourImageVariant.BLEED,
  },
});
```

## Disabling

```ts
await borda.mount({
  steps: [...],
  tourImage: false,
});
```

Per-step disable:

```ts
steps: [
  {
    target: '#element',
    title: 'No image here',
    description: 'This step has no image.',
    placement: 'bottom-center',
    tourImage: false,
  },
]
```

## Interface

```ts
interface BordaTourImageProps {
  variant: BordaTourImageVariant;
  aria: Partial<ComponentAriaProps>;
  customClasses: Partial<BordaImageCustomClasses>;
  customStyles: Partial<BordaImageCustomStyles>;
  customHtml: Partial<BordaImageCustomHtml>;
}
```

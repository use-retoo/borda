# Size

> Configure widget dimensions with ComponentSize — xs, sm, md, lg, xl, xxl.

Widget dimensions are controlled by the `size` property, which selects from a predefined scale ranging from `xs` to `xxl`. All internal elements — tooltip, buttons, close button — scale proportionally, so you never need to adjust individual components manually.

## Available sizes

<table>
<thead>
  <tr>
    <th>
      Value
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
        xs
      </code>
    </td>
    
    <td>
      Extra small — minimal footprint
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        sm
      </code>
    </td>
    
    <td>
      Small
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        md
      </code>
    </td>
    
    <td>
      Medium (default)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        lg
      </code>
    </td>
    
    <td>
      Large
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        xl
      </code>
    </td>
    
    <td>
      Extra large
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        xxl
      </code>
    </td>
    
    <td>
      Maximum size
    </td>
  </tr>
</tbody>
</table>

## Extra small

<borda-container>
<borda-component :config="{"size":"xs","steps":[{"target":"#extra-small","title":"Extra small","description":"The most compact size — minimal padding and font sizes.","placement":"bottom-start"}]}">



</borda-component>
</borda-container>

```ts
import { useBorda, ComponentSize } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

await borda.mount({
  steps: [
    {
      target: '#extra-small',
      title: 'Extra small',
      description: 'The most compact size — minimal padding and font sizes.',
      placement: 'bottom-start',
    },
  ],
  size: ComponentSize.XS,
});
```

## Small

<borda-container>
<borda-component :config="{"size":"sm","steps":[{"target":"#small","title":"Small","description":"Slightly larger than extra small — still compact.","placement":"bottom-start"}]}">



</borda-component>
</borda-container>

```ts
import { useBorda, ComponentSize } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

await borda.mount({
  steps: [
    {
      target: '#small',
      title: 'Small',
      description: 'Slightly larger than extra small — still compact.',
      placement: 'bottom-start',
    },
  ],
  size: ComponentSize.SM,
});
```

## Medium

<borda-container>
<borda-component :config="{"size":"md","steps":[{"target":"#medium","title":"Medium","description":"The default size — balanced for most use cases.","placement":"bottom-start"}]}">



</borda-component>
</borda-container>

```ts
import { useBorda, ComponentSize } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

await borda.mount({
  steps: [
    {
      target: '#medium',
      title: 'Medium',
      description: 'The default size — balanced for most use cases.',
      placement: 'bottom-start',
    },
  ],
  size: ComponentSize.MD,
});
```

## Large

<borda-container>
<borda-component :config="{"size":"lg","steps":[{"target":"#large","title":"Large","description":"Larger padding and font sizes for better readability.","placement":"bottom-start"}]}">



</borda-component>
</borda-container>

```ts
import { useBorda, ComponentSize } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

await borda.mount({
  steps: [
    {
      target: '#large',
      title: 'Large',
      description: 'Larger padding and font sizes for better readability.',
      placement: 'bottom-start',
    },
  ],
  size: ComponentSize.LG,
});
```

## Extra large

<borda-container>
<borda-component :config="{"size":"xl","steps":[{"target":"#extra-large","title":"Extra large","description":"Spacious layout with generous padding.","placement":"bottom-start"}]}">



</borda-component>
</borda-container>

```ts
import { useBorda, ComponentSize } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

await borda.mount({
  steps: [
    {
      target: '#extra-large',
      title: 'Extra large',
      description: 'Spacious layout with generous padding.',
      placement: 'bottom-start',
    },
  ],
  size: ComponentSize.XL,
});
```

## Extra extra large

<borda-container>
<borda-component :config="{"size":"xxl","steps":[{"target":"#extra-extra-large","title":"Extra extra large","description":"Maximum size — biggest padding, fonts, and button targets.","placement":"bottom-start"}]}">



</borda-component>
</borda-container>

```ts
import { useBorda, ComponentSize } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

await borda.mount({
  steps: [
    {
      target: '#extra-extra-large',
      title: 'Extra extra large',
      description: 'Maximum size — biggest padding, fonts, and button targets.',
      placement: 'bottom-start',
    },
  ],
  size: ComponentSize.XXL,
});
```

## Runtime

```ts
import { useBorda, ComponentSize } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

const instance = await borda.mount({
  steps: [
    {
      target: '#sidebar',
      title: 'Navigation',
      description: 'Use the sidebar to browse sections.',
      placement: 'bottom-start',
    },
  ],
});

instance.config.mergeConfig({
  size: ComponentSize.LG,
});
```

The widget re-renders at the new size immediately. All child elements adapt automatically.

## Overrides

Global size applies to all components at once, but each component can override it individually. This is useful when one element needs to stand out or stay compact regardless of the overall scale:

```ts
await borda.mount({
  steps: [...],
  size: ComponentSize.LG,
  tourTooltip: {
    size: ComponentSize.SM,
  },
  tourButtons: {
    size: ComponentSize.MD,
  },
  closeButton: {
    size: ComponentSize.SM,
  },
});
```

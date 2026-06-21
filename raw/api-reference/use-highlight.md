# useHighlight

> Spotlight a single element without running a full tour.

The `useBordaHighlight` hook provides the `highlight()` shortcut — spotlights a single element by mounting a one-step tour through the factory.

```ts
import { useBordaHighlight } from '@retoo/borda';
```

In most cases, you don't need this hook directly — use `borda.highlight()` instead, which calls it internally.

## Usage

```ts
import { useBorda, useBordaHighlight, ComponentPlacement } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

// Equivalent to borda.highlight(...)
const instance = await borda.highlight({
  target: '#important-button',
  title: 'Try this',
  description: 'This is the main action.',
  placement: ComponentPlacement.BOTTOM_CENTER,
});
```

## Parameters

<table>
<thead>
  <tr>
    <th>
      Parameter
    </th>
    
    <th>
      Type
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
        step
      </code>
    </td>
    
    <td>
      <code>
        BordaStepConfig
      </code>
    </td>
    
    <td>
      Step definition (target, title, description, placement, etc.)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        config
      </code>
    </td>
    
    <td>
      <code>
        BordaHighlightConfig
      </code>
    </td>
    
    <td>
      Optional top-level config (same as <code>
        BordaConfig
      </code>
      
       without <code>
        steps
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        target
      </code>
    </td>
    
    <td>
      <code>
        BordaTarget
      </code>
    </td>
    
    <td>
      Optional mount target — <code>
        HTMLElement
      </code>
      
       or <code>
        ShadowRoot
      </code>
    </td>
  </tr>
</tbody>
</table>

## Returns

Returns a `Promise<BordaInstance>` — the same instance object as `mount()`.

## Interface

```ts
interface UseBordaHighlightReturns {
  highlight: (
    step: BordaStepConfig,
    config?: BordaHighlightConfig,
    target?: BordaTarget
  ) => Promise<BordaInstance>;
}
```

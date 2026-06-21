# useBorda

> Tour factory function that returns mount, unmount, highlight, NAME, and VERSION.

The factory function that creates a tour manager. Call it once to get a reusable object with mount, unmount, and highlight methods — each mount creates an independent instance.

```ts
import { useBorda } from '@retoo/borda';

const borda = useBorda();
```

## Returns

Returns a `UseBordaReturns` object with the following properties:

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
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        NAME
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Library name
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VERSION
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Library version
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mount
      </code>
    </td>
    
    <td>
      <code>
        (config: BordaConfig, target?: BordaTarget) => Promise<BordaInstance>
      </code>
    </td>
    
    <td>
      Mount a tour into the DOM
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unmount
      </code>
    </td>
    
    <td>
      <code>
        (instance: BordaInstance) => Promise<void>
      </code>
    </td>
    
    <td>
      Destroy a mounted tour
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        highlight
      </code>
    </td>
    
    <td>
      <code>
        (step: BordaStepConfig, config?: BordaHighlightConfig, target?: BordaTarget) => Promise<BordaInstance>
      </code>
    </td>
    
    <td>
      Spotlight a single element
    </td>
  </tr>
</tbody>
</table>

## mount

Mounts a tour into a target element and returns a promise that resolves with a `BordaInstance` once the Svelte component is rendered and the event bus is ready. The only required config field is `steps`.

```ts
const instance = await borda.mount({
  steps: [
    {
      target: '#sidebar',
      title: 'Navigation',
      description: 'Browse sections here.',
      placement: ComponentPlacement.MIDDLE_END,
    },
  ],
});
```

The second argument specifies the mount target — any `HTMLElement` or `ShadowRoot`. When omitted, the widget mounts into `document.body`:

```ts
const container = document.getElementById('tour-root');

const instance = await borda.mount(
  { steps: [...] },
  container,
);
```

<callout icon="i-lucide-arrow-right" to="/api-reference/borda-instance">

See **Borda Instance** for the full shape of the returned object.

</callout>

## unmount

Destroys a previously mounted tour and removes it from the DOM:

```ts
await borda.unmount(instance);
```

After unmounting, all event handlers are cleared automatically.

## highlight

Spotlights a single element without running a full tour:

```ts
const instance = await borda.highlight({
  target: '#important-button',
  title: 'Try this',
  description: 'This is the main action.',
  placement: ComponentPlacement.BOTTOM_CENTER,
});
```

<callout icon="i-lucide-arrow-right" to="/features/highlight">

See **Highlight** for full usage details and config options.

</callout>

## Multiple instances

Each `mount()` call creates an independent tour. You can run several instances on the same page:

```ts
const borda = useBorda();

const tour1 = await borda.mount({ steps: [...] });
const tour2 = await borda.mount({ steps: [...] });

// Unmount individually
await borda.unmount(tour1);
```

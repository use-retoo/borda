# Overrides

> Layered config overrides for responsive breakpoints and per-step customization.

Borda uses a layered override system that merges config from multiple sources in a fixed priority order. This powers both responsive breakpoints and per-step component overrides.

## Override layers

<table>
<thead>
  <tr>
    <th>
      Layer
    </th>
    
    <th>
      Priority
    </th>
    
    <th>
      Source
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        base
      </code>
    </td>
    
    <td>
      Lowest
    </td>
    
    <td>
      The config passed to <code>
        mount()
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        responsive
      </code>
    </td>
    
    <td>
      Medium
    </td>
    
    <td>
      Breakpoint overrides from the <code>
        responsive
      </code>
      
       config key
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        step
      </code>
    </td>
    
    <td>
      Highest
    </td>
    
    <td>
      Per-step overrides from individual step definitions
    </td>
  </tr>
</tbody>
</table>

Each layer can override any config property. Higher-priority layers always win — a per-step `tourButtons: false` overrides both the base config and any responsive override.

## Per-step overrides

Each step can override global component settings. These overrides are active only while that step is displayed:

```ts
await borda.mount({
  steps: [
    {
      target: '#intro',
      title: 'Welcome',
      description: 'Getting started.',
      placement: 'bottom-center',
      tourButtons: { skip: false },
      tourProgress: false,
    },
    {
      target: '#details',
      title: 'Details',
      description: 'More info here.',
      placement: 'middle-end',
      closeButton: false,
      tourOverlay: {
        padding: 16,
      },
    },
  ],
});
```

When the user navigates from step 1 to step 2, the step 1 overrides are cleared and step 2's overrides are applied.

## Runtime API

```ts
// Read the fully resolved config (all layers merged)
const resolved = instance.config.current;

// Update the base layer
instance.config.mergeConfig({ size: ComponentSize.LG });
```

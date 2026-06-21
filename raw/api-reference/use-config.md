# useConfig

> Reactive config store with get, set, and merge methods.

The config store provides reactive read and write access to the tour configuration at runtime. Access it through `instance.config`.

## Methods

<table>
<thead>
  <tr>
    <th>
      Method
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
        current
      </code>
    </td>
    
    <td>
      Current resolved config snapshot (reactive)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        getConfig()
      </code>
    </td>
    
    <td>
      Returns the current config object
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        setConfig(value)
      </code>
    </td>
    
    <td>
      Replaces the entire config with a new value
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mergeConfig(partial)
      </code>
    </td>
    
    <td>
      Deeply merges a partial config into the current one
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
// Read current config
const config = instance.config.current;

// Get a snapshot
const snapshot = instance.config.getConfig();

// Replace entirely
instance.config.setConfig({
  steps: [
    {
      target: '#new-element',
      title: 'New tour',
      description: 'Starting fresh.',
      placement: 'bottom-center',
    },
  ],
});

// Deep merge — only specified fields are updated
instance.config.mergeConfig({
  size: ComponentSize.LG,
  tourButtons: { skip: false },
});
```

Both `setConfig` and `mergeConfig` trigger a reactive update — the widget re-renders immediately without remounting.

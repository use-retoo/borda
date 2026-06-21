# Skip API

> Manage the "Don't show again" state persisted in localStorage.

The skip API manages the "Don't show again" flag. Access it through `instance.skip`.

## Properties

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
        isSkipped
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether the skip flag is currently set
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        storageKey
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Active storage key (from config or default)
    </td>
  </tr>
</tbody>
</table>

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
        set(value)
      </code>
    </td>
    
    <td>
      Sets the skip flag and persists it. No-op when <code>
        skip
      </code>
      
       is disabled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        clear()
      </code>
    </td>
    
    <td>
      Clears the persisted flag. Works even when <code>
        skip
      </code>
      
       is disabled.
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
// Check if user chose to skip
if (instance.skip.isSkipped) {
  console.log('User opted out of tours');
}

// Set manually
instance.skip.set(true);

// Clear (tour will replay next time)
instance.skip.clear();

// Read the storage key
console.log(instance.skip.storageKey); // e.g. "borda-skip"
```

## Events

Skip state changes emit events:

```ts
import { BordaEvent } from '@retoo/borda';

instance.api.events.on(BordaEvent.ON_SKIP_CHANGE, () => {
  console.log('Skip toggled:', instance.skip.isSkipped);
});

instance.api.events.on(BordaEvent.ON_SKIP_CLEAR, () => {
  console.log('Skip cleared');
});
```

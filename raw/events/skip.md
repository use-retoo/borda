# Skip

> Handle "Don't show again" state changes with ON_SKIP_CHANGE and ON_SKIP_CLEAR.

Skip events fire when the "Don't show again" checkbox changes value or when the skip state is cleared programmatically.

## Events

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      String value
    </th>
    
    <th>
      When
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ON_SKIP_CHANGE
      </code>
    </td>
    
    <td>
      <code>
        skip:change
      </code>
    </td>
    
    <td>
      Checkbox value changes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_SKIP_CLEAR
      </code>
    </td>
    
    <td>
      <code>
        skip:clear
      </code>
    </td>
    
    <td>
      Skip state is cleared via <code>
        skip.clear()
      </code>
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
import { BordaEvent } from '@retoo/borda';

instance.api.events.on(BordaEvent.ON_SKIP_CHANGE, () => {
  console.log('Skip toggled:', instance.skip.isSkipped);
});

instance.api.events.on(BordaEvent.ON_SKIP_CLEAR, () => {
  console.log('Skip state cleared');
});
```

# Visibility

> Handle widget show and hide transitions with ON_VISIBILITY_SHOW and ON_VISIBILITY_HIDE.

Visibility events fire when the widget's visibility state changes.

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
        ON_VISIBILITY_SHOW
      </code>
    </td>
    
    <td>
      <code>
        visibility:show
      </code>
    </td>
    
    <td>
      Widget becomes visible
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VISIBILITY_HIDE
      </code>
    </td>
    
    <td>
      <code>
        visibility:hide
      </code>
    </td>
    
    <td>
      Widget becomes hidden
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
import { BordaEvent } from '@retoo/borda';

instance.api.events.on(BordaEvent.ON_VISIBILITY_SHOW, () => {
  console.log('Widget is now visible');
});

instance.api.events.on(BordaEvent.ON_VISIBILITY_HIDE, () => {
  console.log('Widget is now hidden');
});
```

# Visibility API

> Show, hide, and check the widget's visibility state at runtime.

The visibility API controls whether the widget is shown or hidden. Access it through `instance.visibility`.

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
        isHidden
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether the widget is currently hidden
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
        show()
      </code>
    </td>
    
    <td>
      Show the widget (set <code>
        isHidden
      </code>
      
       to <code>
        false
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        hide()
      </code>
    </td>
    
    <td>
      Hide the widget (set <code>
        isHidden
      </code>
      
       to <code>
        true
      </code>
      
      )
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
// Check state
if (instance.visibility.isHidden) {
  instance.visibility.show();
}

// Toggle
instance.visibility.show();
instance.visibility.hide();
```

## Events

Visibility changes emit events:

```ts
import { BordaEvent } from '@retoo/borda';

instance.api.events.on(BordaEvent.ON_VISIBILITY_SHOW, () => {
  console.log('Visible');
});

instance.api.events.on(BordaEvent.ON_VISIBILITY_HIDE, () => {
  console.log('Hidden');
});
```

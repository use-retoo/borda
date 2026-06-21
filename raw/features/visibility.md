# Visibility

> Show and hide the widget with optional CSS transitions.

Visibility controls whether the widget is shown or hidden. It supports an initial hidden state and CSS-animated transitions. The widget can be toggled at runtime through the visibility API.

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Visibility","description":"This tour demonstrates visibility transitions.","placement":"bottom-start"},{"target":"#page-toc","title":"Code example","description":"Configure visibility with isHidden and isAnimated.","placement":"top-center"}],"visibility":{"isHidden":true,"isAnimated":true}}">



</borda-component>
</borda-container>

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
        isHidden
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Start the widget in a hidden state
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isAnimated
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Enable CSS animations for show/hide transitions
    </td>
  </tr>
</tbody>
</table>

```ts
await borda.mount({
  steps: [
    {
      target: '#element',
      title: 'Title',
      description: 'Description',
      placement: 'bottom-center',
    },
  ],
  visibility: {
    isHidden: true,
    isAnimated: true,
  },
});
```

When `isHidden` is `true`, the widget mounts but remains invisible until `show()` is called.

## Runtime API

```ts
// Show the widget
instance.visibility.show();

// Hide the widget
instance.visibility.hide();

// Check current state
instance.visibility.isHidden;
```

## Events

Visibility changes emit events through the event bus:

```ts
import { BordaEvent } from '@retoo/borda';

instance.api.events.on(BordaEvent.ON_VISIBILITY_SHOW, () => {
  console.log('Widget is now visible');
});

instance.api.events.on(BordaEvent.ON_VISIBILITY_HIDE, () => {
  console.log('Widget is now hidden');
});
```

# Keyboard

> Navigate the tour with ArrowRight, ArrowLeft, and Escape keys.

When keyboard control is enabled, Borda attaches a document-level `keydown` listener that maps arrow keys and Escape to tour navigation. Enabled by default.

## Key bindings

<table>
<thead>
  <tr>
    <th>
      Key
    </th>
    
    <th>
      Action
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ArrowRight
      </code>
    </td>
    
    <td>
      Next step
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ArrowLeft
      </code>
    </td>
    
    <td>
      Previous step
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Escape
      </code>
    </td>
    
    <td>
      Close the tour
    </td>
  </tr>
</tbody>
</table>

## Config

Keyboard control is part of the `tour` config:

```ts
await borda.mount({
  steps: [
    {
      target: '#element',
      title: 'Title',
      description: 'Use arrow keys to navigate.',
      placement: 'bottom-center',
    },
  ],
  tour: {
    hasKeyboardControl: true,
  },
});
```

Disable keyboard navigation:

```ts
tour: {
  hasKeyboardControl: false,
}
```

## Events

Keyboard input emits dedicated events:

```ts
import { BordaEvent } from '@retoo/borda';

instance.api.events.on(BordaEvent.ON_KEYBOARD_NEXT, () => {
  console.log('ArrowRight pressed');
});

instance.api.events.on(BordaEvent.ON_KEYBOARD_PREV, () => {
  console.log('ArrowLeft pressed');
});
```

## Notes

- Keypresses originating from form controls (`input`, `textarea`, `select`, `contenteditable`) are ignored so the widget doesn't interfere with text input.
- Keyboard listeners are automatically removed on unmount.

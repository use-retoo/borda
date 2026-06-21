# Keyboard

> Handle keyboard navigation input with ON_KEYBOARD_NEXT and ON_KEYBOARD_PREV.

Keyboard events fire when the user presses arrow keys during an active tour. These events are emitted only when keyboard control is enabled.

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
        ON_KEYBOARD_NEXT
      </code>
    </td>
    
    <td>
      <code>
        keyboard:next
      </code>
    </td>
    
    <td>
      ArrowRight is pressed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_KEYBOARD_PREV
      </code>
    </td>
    
    <td>
      <code>
        keyboard:prev
      </code>
    </td>
    
    <td>
      ArrowLeft is pressed
    </td>
  </tr>
</tbody>
</table>

## Usage

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

- Keypresses originating from form controls (`input`, `textarea`, `select`, `contenteditable`) are ignored.
- The Escape key emits `ON_TOUR_CLOSE`, not a keyboard event.
- Keyboard listeners are automatically removed on unmount.

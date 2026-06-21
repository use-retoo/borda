# Widget

> Handle widget destruction with ON_BORDA_DESTROY and interactions with ON_CLOSE_CLICK and ON_OVERLAY_CLICK.

Widget events fire for structural lifecycle and user interactions with the overlay and close button. They carry no payload and require no arguments in the handler.

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
        ON_BORDA_DESTROY
      </code>
    </td>
    
    <td>
      <code>
        borda:on-destroy
      </code>
    </td>
    
    <td>
      Widget is about to be destroyed, before cleanup
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_CLOSE_CLICK
      </code>
    </td>
    
    <td>
      <code>
        close:click
      </code>
    </td>
    
    <td>
      Close button is clicked
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_OVERLAY_CLICK
      </code>
    </td>
    
    <td>
      <code>
        overlay:click
      </code>
    </td>
    
    <td>
      Overlay backdrop is clicked or activated via Enter/Space
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
import { BordaEvent } from '@retoo/borda';

instance.api.events.on(BordaEvent.ON_BORDA_DESTROY, () => {
  console.log('Widget is being destroyed');
});

instance.api.events.on(BordaEvent.ON_CLOSE_CLICK, () => {
  console.log('Close button clicked');
});

instance.api.events.on(BordaEvent.ON_OVERLAY_CLICK, () => {
  console.log('Overlay backdrop clicked');
});
```

## Unsubscribing

Pass the same handler reference to `off()`:

```ts
const onDestroy = () => console.log('Destroyed');

instance.api.events.on(BordaEvent.ON_BORDA_DESTROY, onDestroy);

// Later
instance.api.events.off(BordaEvent.ON_BORDA_DESTROY, onDestroy);
```

## Notes

- `ON_BORDA_DESTROY` fires before cleanup. After this event, the event emitter is cleared and all handlers are removed automatically.
- `ON_CLOSE_CLICK` and `ON_OVERLAY_CLICK` are user interaction events — they fire regardless of whether the tour has a close handler configured.

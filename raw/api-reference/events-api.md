# Events API

> Pub/sub event emitter for subscribing to tour and widget lifecycle events.

The event emitter provides a typed pub/sub system for listening to tour, widget, and feature events. Access it through `instance.api.events`.

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
        on(eventName, handler)
      </code>
    </td>
    
    <td>
      Subscribe a handler to an event
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        once(eventName, handler)
      </code>
    </td>
    
    <td>
      Subscribe; auto-unsubscribes after first call
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        off(eventName, handler)
      </code>
    </td>
    
    <td>
      Unsubscribe a specific handler
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        emit<T>(eventName, data?)
      </code>
    </td>
    
    <td>
      Emit an event with optional data
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        remove(eventName)
      </code>
    </td>
    
    <td>
      Remove all handlers for a specific event
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        clear()
      </code>
    </td>
    
    <td>
      Remove all handlers for all events
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
import { BordaEvent } from '@retoo/borda';

// Subscribe
instance.api.events.on(BordaEvent.ON_TOUR_START, () => {
  console.log('Tour started');
});

// Unsubscribe
const handler = () => console.log('finished');
instance.api.events.on(BordaEvent.ON_TOUR_FINISH, handler);
instance.api.events.off(BordaEvent.ON_TOUR_FINISH, handler);

// One-time subscription
instance.api.events.once(BordaEvent.ON_TOUR_CLOSE, () => {
  console.log('Tour closed (once)');
});
```

## Cleanup

All handlers are automatically cleared when the instance is unmounted. There is no need to unsubscribe manually before calling `borda.unmount()`.

## Events list

See the [Events](/events/tour) section for the full list of available events organized by category.

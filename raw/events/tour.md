# Tour

> Lifecycle events for tour start, finish, close, navigation, and step changes.

Tour events fire during the tour lifecycle — when it starts, finishes, closes, and when the user navigates between steps. All events are accessible through `instance.api.events`.

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
        ON_TOUR_START
      </code>
    </td>
    
    <td>
      <code>
        tour:start
      </code>
    </td>
    
    <td>
      Tour initialises on mount
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_TOUR_FINISH
      </code>
    </td>
    
    <td>
      <code>
        tour:finish
      </code>
    </td>
    
    <td>
      Last step is completed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_TOUR_CLOSE
      </code>
    </td>
    
    <td>
      <code>
        tour:close
      </code>
    </td>
    
    <td>
      Tour is dismissed before completion
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_TOUR_NEXT
      </code>
    </td>
    
    <td>
      <code>
        tour:next
      </code>
    </td>
    
    <td>
      User advances to the next step (not on last step)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_TOUR_PREV
      </code>
    </td>
    
    <td>
      <code>
        tour:prev
      </code>
    </td>
    
    <td>
      User navigates to the previous step
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_TOUR_STEP_CHANGE
      </code>
    </td>
    
    <td>
      <code>
        tour:step-change
      </code>
    </td>
    
    <td>
      Active step changes (any navigation)
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
import { BordaEvent } from '@retoo/borda';

instance.api.events.on(BordaEvent.ON_TOUR_START, () => {
  analytics.track('tour_started');
});

instance.api.events.on(BordaEvent.ON_TOUR_NEXT, () => {
  analytics.track('tour_step_next', { step: instance.api.controller.currentStep });
});

instance.api.events.on(BordaEvent.ON_TOUR_FINISH, () => {
  analytics.track('tour_completed');
});

instance.api.events.on(BordaEvent.ON_TOUR_CLOSE, () => {
  analytics.track('tour_dismissed');
});

instance.api.events.on(BordaEvent.ON_TOUR_STEP_CHANGE, () => {
  console.log('Now on step', instance.api.controller.currentStep);
});
```

## Unsubscribing

Pass the same handler reference to `off()`:

```ts
const handler = () => console.log('finished');

instance.api.events.on(BordaEvent.ON_TOUR_FINISH, handler);

// Later
instance.api.events.off(BordaEvent.ON_TOUR_FINISH, handler);
```

## Notes

- `ON_TOUR_START` fires once after the first step is rendered.
- `ON_TOUR_FINISH` fires before the unmount animation begins.
- `ON_TOUR_CLOSE` fires when the user dismisses the tour via the close button, backdrop click, or Escape key.
- `ON_TOUR_STEP_CHANGE` fires on every navigation — including `next`, `prev`, `changeStep`, and `finish`.

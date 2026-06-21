# DOM Events

> Listen to tour and widget events on the custom element via addEventListener.

The custom element dispatches all `BordaEvent` values as standard `CustomEvent` instances on the DOM element itself. Both bubble and cross shadow DOM boundaries (`composed: true`).

Events fire with the same names as the `BordaEvent` enum values — `tour:start`, `tour:finish`, `close:click`, and so on. The `event.detail` payload matches the data emitted on the internal event bus.

## Listening

```ts
const widget = document.querySelector('borda-tour-widget');

widget.addEventListener('tour:start', () => {
  console.log('Onboarding started');
});

widget.addEventListener('tour:finish', () => {
  console.log('Onboarding completed');
});

widget.addEventListener('tour:step-change', (event) => {
  console.log('Step changed', event.detail);
});

widget.addEventListener('tour:close', () => {
  console.log('Onboarding dismissed');
});
```

## Removing listeners

Use standard `removeEventListener` — pass the same handler reference:

```ts
const handler = () => console.log('finished');

widget.addEventListener('tour:finish', handler);

// Later
widget.removeEventListener('tour:finish', handler);
```

## Event summary

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      Fires when
    </th>
    
    <th>
      <code>
        event.detail
      </code>
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        tour:start
      </code>
    </td>
    
    <td>
      Tour initialises on mount
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tour:finish
      </code>
    </td>
    
    <td>
      Last step is completed
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tour:close
      </code>
    </td>
    
    <td>
      Tour is dismissed before completion
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tour:next
      </code>
    </td>
    
    <td>
      User advances to the next step
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tour:prev
      </code>
    </td>
    
    <td>
      User navigates to the previous step
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tour:step-change
      </code>
    </td>
    
    <td>
      Active step changes
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        close:click
      </code>
    </td>
    
    <td>
      Close button is clicked
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        overlay:click
      </code>
    </td>
    
    <td>
      Overlay backdrop is clicked
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        skip:change
      </code>
    </td>
    
    <td>
      Skip checkbox changes
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        skip:clear
      </code>
    </td>
    
    <td>
      Skip state is cleared
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        visibility:show
      </code>
    </td>
    
    <td>
      Widget becomes visible
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        visibility:hide
      </code>
    </td>
    
    <td>
      Widget becomes hidden
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        keyboard:next
      </code>
    </td>
    
    <td>
      ArrowRight is pressed
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        keyboard:prev
      </code>
    </td>
    
    <td>
      ArrowLeft is pressed
    </td>
    
    <td>
      —
    </td>
  </tr>
</tbody>
</table>

## Notes

- Events bubble and are composed, so they cross shadow DOM boundaries.
- Use standard `addEventListener` / `removeEventListener` — no custom API needed.
- All handlers are automatically cleaned up when the element is removed from the DOM.

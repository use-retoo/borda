# Borda Instance

> The object returned by mount() — API, config, responsive, scroll, animation, skip, visibility.

The `BordaInstance` is returned by `borda.mount()` and `borda.highlight()`. It provides runtime access to every feature API and the reactive config store.

```ts
const instance = await borda.mount({ steps: [...] });
```

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
        api
      </code>
    </td>
    
    <td>
      <code>
        BordaApi
      </code>
    </td>
    
    <td>
      Tour controller, components, and event bus
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        config
      </code>
    </td>
    
    <td>
      <code>
        UseBordaConfigReturns
      </code>
    </td>
    
    <td>
      Reactive config store
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        responsive
      </code>
    </td>
    
    <td>
      <code>
        BordaResponsiveApi
      </code>
    </td>
    
    <td>
      Active breakpoint info
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scroll
      </code>
    </td>
    
    <td>
      <code>
        BordaScrollApi
      </code>
    </td>
    
    <td>
      Scroll-to-target API
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        animation
      </code>
    </td>
    
    <td>
      <code>
        BordaAnimationApi
      </code>
    </td>
    
    <td>
      Resolved animation settings
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        skip
      </code>
    </td>
    
    <td>
      <code>
        BordaSkipApi
      </code>
    </td>
    
    <td>
      "Don't show again" state
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        visibility
      </code>
    </td>
    
    <td>
      <code>
        BordaVisibilityApi
      </code>
    </td>
    
    <td>
      Show/hide API
    </td>
  </tr>
</tbody>
</table>

## api

The top-level API surface:

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
        api.controller
      </code>
    </td>
    
    <td>
      <code>
        BordaControllerApi
      </code>
    </td>
    
    <td>
      Tour navigation — currentStep, next, prev, changeStep, finish
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        api.components
      </code>
    </td>
    
    <td>
      <code>
        BordaComponents
      </code>
    </td>
    
    <td>
      References to all child component instances
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        api.events
      </code>
    </td>
    
    <td>
      <code>
        BordaEventEmitter
      </code>
    </td>
    
    <td>
      Pub/sub event bus for tour events
    </td>
  </tr>
</tbody>
</table>

## config

The reactive config store:

```ts
// Read current config
const config = instance.config.current;

// Get a snapshot
const snapshot = instance.config.getConfig();

// Replace entirely
instance.config.setConfig({ steps: [...] });

// Deep merge
instance.config.mergeConfig({ tourButtons: { skip: false } });
```

## Quick reference

```ts
// Tour navigation
instance.api.controller.next();
instance.api.controller.prev();
instance.api.controller.changeStep(2);
instance.api.controller.finish();

// Visibility
instance.visibility.show();
instance.visibility.hide();

// Scroll
await instance.scroll.scrollTo(document.getElementById('target'));

// Skip
instance.skip.set(true);
instance.skip.clear();

// Events
instance.api.events.on(BordaEvent.ON_TOUR_FINISH, () => { ... });

// Config
instance.config.mergeConfig({ size: ComponentSize.LG });
```

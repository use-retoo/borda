# Quick Start

> Set up your first onboarding in under 5 minutes.

## Basic setup

<steps>

### Import Borda

Import the factory function and the required stylesheet:

```ts
import { useBorda } from '@retoo/borda';

import '@retoo/borda/styles';
```

### Create a factory

`useBorda()` returns a factory object that manages widget instances. One factory can create multiple independent tours:

```ts
const borda = useBorda();
```

### Define steps

Each step requires a `target` (CSS selector or HTMLElement), a `title`, and a `description`. The `placement` controls where the tooltip appears relative to the target:

```ts
import { ComponentPlacement } from '@retoo/borda';

const steps = [
  {
    target: '#sidebar',
    title: 'Navigation',
    description: 'Use the sidebar to browse different sections.',
    placement: ComponentPlacement.MIDDLE_END,
  },
  {
    target: '#search-bar',
    title: 'Search',
    description: 'Find anything quickly with the search bar.',
    placement: ComponentPlacement.BOTTOM_CENTER,
  },
];
```

### Mount the tour

Pass the steps to `mount()`. The tour initializes and displays the first step:

```ts
const instance = await borda.mount({ steps });
```

`mount()` is async — it resolves after the widget is rendered and attached to the DOM.

</steps>

## Controlling the tour

The `instance.api.controller` interface provides full control over the tour navigation. All methods are available immediately after mount:

```ts
// Navigate between steps
await instance.api.controller.next();
await instance.api.controller.prev();

// Jump to a specific step by index (0-based)
await instance.api.controller.changeStep(1);

// Finish the tour
instance.api.controller.finish();
```

You can also read the current tour state at any time:

```ts
instance.api.controller.currentStep;      // 1-based step number
instance.api.controller.currentStepIndex;  // 0-based index
instance.api.controller.totalSteps;
instance.api.controller.hasNextStep;
instance.api.controller.hasPrevStep;
instance.api.controller.currentTarget;     // DOM element of current step
```

## Listening to events

Subscribe to typed events through `instance.api.events` to connect the tour with your application logic:

```ts [events.ts]
import { BordaEvent } from '@retoo/borda';

// Tour started
instance.api.events.on(BordaEvent.ON_TOUR_START, () => {
  analytics.track('tour_started');
});

// User advanced to next step
instance.api.events.on(BordaEvent.ON_TOUR_NEXT, () => {
  analytics.track('tour_step', { step: instance.api.controller.currentStep });
});

// Tour completed
instance.api.events.on(BordaEvent.ON_TOUR_FINISH, () => {
  analytics.track('tour_completed');
});

// Tour dismissed before completion
instance.api.events.on(BordaEvent.ON_TOUR_CLOSE, () => {
  analytics.track('tour_dismissed');
});
```

To remove a specific handler, pass the same function reference to `off()`:

```ts
const handler = () => console.log('started');

instance.api.events.on(BordaEvent.ON_TOUR_START, handler);

// Later
instance.api.events.off(BordaEvent.ON_TOUR_START, handler);
```

## Runtime

Modify any config property after mount without recreating the widget. `mergeConfig()` performs a deep merge — only the fields you pass are updated:

```ts [runtime.ts]
import { ComponentPlacement } from '@retoo/borda';

// Add a new step
instance.config.mergeConfig({
  steps: [
    ...instance.config.current.steps,
    {
      target: '#settings',
      title: 'Settings',
      description: 'Customize your experience here.',
      placement: ComponentPlacement.BOTTOM_START,
    },
  ],
});
```

To replace the entire config at once, use `setConfig()`:

```ts
instance.config.setConfig({
  steps: [
    {
      target: '#new-element',
      title: 'New tour',
      description: 'Starting fresh.',
      placement: ComponentPlacement.BOTTOM_CENTER,
    },
  ],
});
```

<callout icon="i-lucide-arrow-right" to="/configuration/overview">

For full config reference — steps, animation, scroll, skip, visibility — see the **Configuration** section.

</callout>

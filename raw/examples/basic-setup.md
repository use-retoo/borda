# Basic Setup

> Every BordaConfig option in one live control panel — steps, widget size, components, animation, and scroll.

This example exposes the full `BordaConfig` surface through a live control panel: per-step content and placement, widget size and shape, tooltip spacing, which components render, animation effects, and scroll behavior.

Adjust any control below, then click **Start Tour** to mount the widget with your current settings.

## Demo

<borda-component-basic-setup>



</borda-component-basic-setup>

## Code

```ts [main.ts]
import {
  useBorda,
  ComponentPlacement,
  ComponentSize,
  ComponentShape,
} from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

const instance = await borda.mount({
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
  steps: [
    {
      target: '#step-1',
      title: 'Welcome',
      description: 'This is the first step of the onboarding.',
      placement: ComponentPlacement.BOTTOM_CENTER,
    },
    {
      target: '#step-2',
      title: 'Navigation',
      description: 'Use the sidebar to browse different sections.',
      placement: ComponentPlacement.MIDDLE_END,
    },
    {
      target: '#step-3',
      title: 'Settings',
      description: 'Customize your experience here.',
      placement: ComponentPlacement.TOP_CENTER,
    },
  ],
  closeButton: {},
  tourButtons: {},
  tourProgress: {},
  tourSkip: {},
  tourTooltip: {
    offset: 8,
    padding: 12,
  },
  animation: {
    isEnabled: true,
    tooltip: {
      enter: 'scale',
      exit: 'scale',
      enterDuration: 200,
      exitDuration: 150,
    },
  },
  scroll: {
    block: 'center',
    duration: 400,
  },
});
```

<callout icon="i-lucide-arrow-right" to="/getting-started/quick-start">

See **Quick Start** for more details on controlling the tour and listening to events.

</callout>

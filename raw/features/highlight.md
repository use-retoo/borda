# Highlight

> Spotlight a single element without running a full tour.

The `highlight()` method spotlights a single element by mounting a one-step tour through the factory. It accepts the same step data as a regular tour step, plus optional top-level config.

## Usage

```ts
import { useBorda, ComponentPlacement } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

const instance = await borda.highlight({
  target: '#important-button',
  title: 'Try this',
  description: 'This is the main action button.',
  placement: ComponentPlacement.BOTTOM_CENTER,
});
```

The returned instance is identical to a regular tour instance — you can listen to events, control visibility, and unmount it the same way.

## With config

Pass a second argument to customize the widget appearance:

```ts
const instance = await borda.highlight(
  {
    target: '#element',
    title: 'Title',
    description: 'Description',
    placement: ComponentPlacement.BOTTOM_CENTER,
  },
  {
    closeButton: false,
    tourButtons: false,
    tourProgress: false,
    animation: {
      tooltip: {
        enterDuration: 300,
      },
    },
  },
);
```

## Target

Pass a third argument to specify the mount target:

```ts
const container = document.getElementById('widget-root');

const instance = await borda.highlight(
  { target: '#el', title: 'Title', description: 'Text', placement: 'bottom-center' },
  {},
  container,
);
```

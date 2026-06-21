# Don't Show Again

> Let users dismiss the onboarding permanently with a persisted skip flag.

A common onboarding pattern: show the tour once, let users opt out, and don't bother them again. Borda handles this out of the box with a "Don't show again" checkbox and localStorage persistence.

## How it works

1. Borda checks `localStorage` for the skip flag under the configured key.
2. If the flag is set, `borda.mount()` still works — but your app can skip calling it entirely.
3. When the user checks "Don't show again", the flag is written to `localStorage` automatically.
4. On the next visit, your app reads the flag and skips the onboarding.

The skip state is managed by Borda — you only need to wrap the mount call in a check.

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Welcome!","description":"This tour will help you get started.","placement":"bottom-start"},{"target":"#page-content","title":"Documentation","description":"Read through the guides to learn how Borda works.","placement":"middle-end"}],"skip":{"storageKey":"my-app-onboarding"},"tourSkip":{"label":"Do not show this again"}}">



</borda-component>
</borda-container>

## Code

```ts [main.ts]
import { useBorda, ComponentPlacement } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

const isSkipped = localStorage.getItem('my-app-onboarding') === 'true';

if (!isSkipped) {
  const instance = await borda.mount({
    steps: [
      {
        target: '#page-header',
        title: 'Welcome!',
        description: 'This tour will help you get started.',
        placement: ComponentPlacement.BOTTOM_START,
      },
      {
        target: '#page-content',
        title: 'Documentation',
        description: 'Read through the guides to learn how Borda works.',
        placement: ComponentPlacement.MIDDLE_END,
      },
    ],
    skip: {
      storageKey: 'my-app-onboarding',
    },
    tourSkip: {
      label: 'Do not show this again',
    },
  });
}
```

Clearing the skip state:

```ts
localStorage.removeItem('my-app-onboarding');
// or
instance.skip.clear();
```

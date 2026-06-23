# Don't Show Again

> Let users dismiss the onboarding permanently with a persisted skip flag.

<div id="skip-description">

A common onboarding pattern: show the tour once, let users opt out, and don't bother them again. Borda handles this out of the box with a "Don't show again" checkbox and localStorage persistence.

</div>

## How it works

<div id="how-it-works-content">

1. Borda checks `localStorage` for the skip flag under the configured key.
2. If the flag is set, `borda.mount()` still works — but your app can skip calling it entirely.
3. When the user checks "Don't show again", the flag is written to `localStorage` automatically.
4. On the next visit, your app reads the flag and skips the onboarding.

The skip state is managed by Borda — you only need to wrap the mount call in a check.

</div>

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Page header","description":"Every page starts with a header — the spotlight draws attention to it.","placement":"bottom-start"},{"target":"#skip-description","title":"Description","description":"Borda handles this out of the box — a checkbox, localStorage persistence, and a simple API.","placement":"bottom-start"},{"target":"#how-it-works","title":"How it works","description":"Borda checks localStorage for the skip flag. When checked, the flag is written automatically.","placement":"middle-end"},{"target":"#how-it-works-content","title":"Four steps","description":"The skip flow has four steps — check, mount, check box, and read flag on next visit.","placement":"middle-start"},{"target":"#code","title":"Code section","description":"The code shows the full pattern — check localStorage, configure storageKey, clear with API.","placement":"top-end"}],"skip":{"storageKey":"my-app-onboarding"},"tourSkip":{"label":"Do not show this again"}}">



</borda-component>
</borda-container>

## Code

<div id="code-block">

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

</div>

<div id="clearing-code">

Clearing the skip state:

```ts
localStorage.removeItem('my-app-onboarding');
// or
instance.skip.clear();
```

</div>

# Overrides

> Per-step config overrides that shadow the global settings.

Each step can override global component settings. These overrides are active only while that step is displayed — when the user navigates away, the global config is restored.

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Default step","description":"No overrides — all components use the global config.","placement":"bottom-start"},{"target":"#page-content","title":"Custom buttons","description":"This step has custom button labels and no skip checkbox.","placement":"top-start","tourButtons":{"next":{"label":"Got it →"},"prev":{"label":"← Back"}},"tourSkip":false},{"target":"#page-toc","title":"Locked step","description":"Progress and close button hidden — must click Finish.","placement":"top-start","tourProgress":false,"closeButton":false,"tourButtons":{"finish":{"label":"All done!"}}}],"scroll":{"block":"center","duration":400},"tourProgress":{"variant":"line"}}">



</borda-component>
</borda-container>

## Code

```ts [main.ts]
import { useBorda, ComponentPlacement, BordaTourProgressVariant } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

await borda.mount({
  tourProgress: { variant: BordaTourProgressVariant.LINE },
  steps: [
    {
      target: '#step-1',
      title: 'Default step',
      description: 'No overrides — all components use the global config.',
      placement: ComponentPlacement.BOTTOM_START,
    },
    {
      target: '#step-2',
      title: 'Custom buttons',
      description: 'This step has custom button labels and no skip checkbox.',
      placement: ComponentPlacement.TOP_START,
      tourButtons: {
        next: { label: 'Got it →' },
        prev: { label: '← Back' },
      },
      tourSkip: false,
    },
    {
      target: '#step-3',
      title: 'Locked step',
      description: 'Progress and close button hidden — must click Finish.',
      placement: ComponentPlacement.TOP_START,
      tourProgress: false,
      closeButton: false,
      tourButtons: { finish: { label: 'All done!' } },
    },
  ],
});
```

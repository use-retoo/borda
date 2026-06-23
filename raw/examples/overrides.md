# Overrides

> Per-step config overrides that shadow the global settings.

<div id="overrides-description">

Each step can override global component settings. These overrides are active only while that step is displayed — when the user navigates away, the global config is restored.

</div>

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Default step","description":"No overrides — all components use the global config.","placement":"bottom-start"},{"target":"#overrides-description","title":"Custom buttons","description":"This step overrides button labels and hides the skip checkbox.","placement":"bottom-start","tourButtons":{"next":{"label":"Got it →","customStyles":{"root":{"background":"#10b981","color":"#fff","borderRadius":"6px","border":"none"}}},"prev":{"label":"← Back","customStyles":{"root":{"background":"#f3f4f6","color":"#374151","borderRadius":"6px","border":"1px solid #d1d5db"}}}},"tourSkip":false},{"target":"#code","title":"Locked step","description":"Progress and close button are hidden — must click the finish button.","placement":"middle-end","tourProgress":false,"closeButton":false,"tourButtons":{"finish":{"label":"All done!","customStyles":{"root":{"background":"#8b5cf6","color":"#fff","borderRadius":"6px","border":"none","padding":"6px 20px"}}}}},{"target":"#code","title":"Code section","description":"The code block shows the full config with per-step overrides.","placement":"top-start","tourButtons":{"next":{"label":"Continue →","customStyles":{"root":{"background":"#3b82f6","color":"#fff","borderRadius":"6px","border":"none"}}},"prev":{"label":"← Prev","customStyles":{"root":{"background":"#eff6ff","color":"#3b82f6","borderRadius":"6px","border":"1px solid #93c5fd"}}}}},{"target":"#code-block","title":"Global config","description":"tourProgress at the top level sets the line variant for all steps.","placement":"top-start"},{"target":"#code-block","title":"Per-step override","description":"Pass tourButtons, tourProgress, closeButton, or tourSkip on any step.","placement":"middle-end"},{"target":"#code-block","title":"Revert on navigate","description":"Overrides are active only while that step is displayed — global config is restored on navigation.","placement":"top-end"}],"scroll":{"block":"center","duration":400},"tourProgress":{"variant":"line"}}">



</borda-component>
</borda-container>

## Code

<div id="code-block">

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
      description: 'This step overrides button labels and hides the skip checkbox.',
      placement: ComponentPlacement.TOP_START,
      tourButtons: {
        next: {
          label: 'Got it →',
          customStyles: { root: { background: '#10b981', color: '#fff', borderRadius: '6px', border: 'none' } },
        },
        prev: {
          label: '← Back',
          customStyles: { root: { background: '#f3f4f6', color: '#374151', borderRadius: '6px', border: '1px solid #d1d5db' } },
        },
      },
      tourSkip: false,
    },
    {
      target: '#step-3',
      title: 'Locked step',
      description: 'Progress and close button hidden — must click the finish button.',
      placement: ComponentPlacement.TOP_START,
      tourProgress: false,
      closeButton: false,
      tourButtons: {
        finish: {
          label: 'All done!',
          customStyles: { root: { background: '#8b5cf6', color: '#fff', borderRadius: '6px', border: 'none', padding: '6px 20px' } },
        },
      },
    },
  ],
});
```

</div>

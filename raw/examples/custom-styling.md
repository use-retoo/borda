# Styling

> Override tooltip and overlay appearance with customClasses and customStyles.

Customize the look and feel of the tour by overriding CSS classes and inline styles on any component.

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Custom styled","description":"This tooltip has custom classes and styles.","placement":"bottom-start"},{"target":"#page-toc","title":"Overlay styled","description":"The overlay has custom padding and border radius.","placement":"top-start","tourOverlay":{"padding":2,"borderRadius":0}}],"scroll":{"block":"center","duration":400},"tourTooltip":{"customClasses":{"root":"shadow-xl rounded-2xl","title":"text-lg font-bold"},"customStyles":{"root":{"maxWidth":"400px"}}},"tourOverlay":{"padding":12}}">



</borda-component>
</borda-container>

## Code

```ts [main.ts]
import { useBorda, ComponentPlacement } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

await borda.mount({
  steps: [
    {
      target: '#element',
      title: 'Custom styled',
      description: 'This tooltip has custom classes and styles.',
      placement: ComponentPlacement.BOTTOM_START,
    },
    {
      target: '#other',
      title: 'Tight spotlight',
      description: 'Per-step overlay overrides.',
      placement: ComponentPlacement.TOP_START,
      tourOverlay: { padding: 2, borderRadius: 0 },
    },
  ],
  tourTooltip: {
    customClasses: {
      root: 'shadow-xl rounded-2xl',
      title: 'text-lg font-bold',
    },
    customStyles: {
      root: { maxWidth: '400px' },
    },
  },
  tourOverlay: {
    padding: 12,
  },
});
```

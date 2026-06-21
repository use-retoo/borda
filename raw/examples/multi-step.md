# Multi-step

> Tour with different target selectors — CSS id, class, and data attributes.

Borda supports multiple ways to target step elements: CSS selectors, class names, and data attributes. This example demonstrates all three approaches in a single tour.

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Target by id","description":"Pass a CSS selector string.","placement":"bottom-start"},{"target":"#page-content","title":"Target by element","description":"Direct element reference via CSS selector.","placement":"top-start"},{"target":"#page-toc","title":"Target by id","description":"Another CSS selector targeting the table of contents.","placement":"middle-start"}],"scroll":{"block":"center","duration":400}}">



</borda-component>
</borda-container>

## Code

```ts [main.ts]
import { useBorda, ComponentPlacement } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

const instance = await borda.mount({
  steps: [
    {
      target: '#step-1',
      title: 'Target by id',
      description: 'Pass a CSS selector string.',
      placement: ComponentPlacement.BOTTOM_START,
    },
    {
      target: '.card-step',
      title: 'Target by class',
      description: 'Pass a class name as a CSS selector.',
      placement: ComponentPlacement.TOP_START,
    },
    {
      target: '[data-step="3"]',
      title: 'Target by data attribute',
      description: 'Pass a data attribute selector.',
      placement: ComponentPlacement.MIDDLE_START,
    },
  ],
  scroll: {
    block: 'center',
    duration: 400,
  },
});
```

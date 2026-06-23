# Multi-step

> Tour with different target selectors — CSS id, class, and data attributes.

<div id="multi-step-description">

Borda supports multiple ways to target step elements: CSS selectors, class names, and data attributes. This example demonstrates all three approaches in a single tour.

</div>

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Id selector","description":"#page-header targets the page header by its id attribute — the simplest CSS selector.","placement":"bottom-start"},{"target":"#multi-step-description","title":"Wrapper id","description":"This paragraph is wrapped in a div with an id — another CSS selector target.","placement":"bottom-start"},{"target":"#code","title":"Heading slug","description":"#code targets the section heading by its auto-generated slug from the text.","placement":"top-start"},{"target":"#code-block","title":"Id in code","description":"#step-1 targets an element by its id attribute — the simplest selector type.","placement":"top-start"},{"target":"#code-block","title":"Class selector","description":".card-step targets elements by class name — useful when ids aren't available.","placement":"middle-end"},{"target":"#code-block","title":"Data attribute","description":"[data-step=\"3\"] targets by custom data attribute — flexible and framework-agnostic.","placement":"top-end"}],"scroll":{"block":"center","duration":400}}">



</borda-component>
</borda-container>

## Code

<div id="code-block">

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

</div>

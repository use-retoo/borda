# Custom Styling

> Override tooltip title, description, and button appearance with customStyles.

<div id="styling-description">

Customize the look and feel of the tour by overriding inline styles on individual tooltip elements — no source modification.

</div>

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Page header","description":"Every page has a header — Borda spotlights it as the tour starting point.","placement":"bottom-start"},{"target":"#styling-description","title":"Custom styling","description":"Override tooltip appearance with customStyles — no source modification.","placement":"bottom-start"},{"target":"#code","title":"Code section","description":"The code block shows the full config for styling the title, description, and buttons.","placement":"top-start"},{"target":"#code-block","title":"Title & description","description":"customStyles.title and customStyles.description override text color and size independently.","placement":"top-start"},{"target":"#code-block","title":"Button styles","description":"tourButtons.customStyles restyles individual buttons, like next.","placement":"middle-end"}],"scroll":{"block":"center","duration":400},"tourTooltip":{"customStyles":{"title":{"color":"#013EFB","fontSize":"18px"},"description":{"color":"#3f3f46"}}},"tourButtons":{"customStyles":{"next":{"background":"#013EFB","color":"rgb(255, 255, 255)","borderRadius":"8px","border":"none","padding":"6px 16px"}}}}">



</borda-component>
</borda-container>

## Code

<div id="code-block">

```ts [main.ts]
import { useBorda, ComponentPlacement } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

await borda.mount({
  steps: [
    {
      target: '#element',
      title: 'Custom styled',
      description: 'This tooltip has custom title and description styles.',
      placement: ComponentPlacement.BOTTOM_START,
    },
  ],
  tourTooltip: {
    customStyles: {
      title: { color: '#013EFB', fontSize: '18px' },
      description: { color: '#3f3f46' },
    },
  },
  tourButtons: {
    customStyles: {
      next: {
        background: '#013EFB',
        color: 'rgb(255, 255, 255)',
        borderRadius: '8px',
        border: 'none',
        padding: '6px 16px',
      },
    },
  },
});
```

</div>

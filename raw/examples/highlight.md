# Highlight

> Spotlight a single element with or without tooltip.

<div id="highlight-description">

Use `highlight()` to draw attention to a single element. You can show a full tooltip with buttons, or just the spotlight overlay with no UI.

</div>

## With tooltip

<borda-container>
<borda-component :config="{"steps":[{"target":"#with-tooltip","title":"Single-element spotlight","description":"Use highlight() instead of mount() when you only need to draw attention to one element.","placement":"bottom-start"}],"tourProgress":false,"tourButtons":{"prev":false,"next":false,"finish":{"label":"Got it"}}}">



</borda-component>
</borda-container>

<div id="with-tooltip-code">

```ts
const instance = await borda.highlight(
  {
    target: '#element',
    title: 'Single-element spotlight',
    description: 'Use highlight() instead of mount() when you only need to draw attention to one element.',
    placement: ComponentPlacement.BOTTOM_START,
  },
  {
    tourProgress: false,
    tourButtons: {
      prev: false,
      next: false,
      finish: { label: 'Got it' },
    },
  },
);
```

</div>

## Overlay only

Show just the spotlight cutout with no tooltip, buttons, or close button:

<borda-container>
<borda-component :config="{"steps":[{"target":"#overlay-only","title":"","description":"","placement":"bottom-start"}],"tourOverlay":{"padding":12,"hasCloseOnBackdropClick":true},"tourTooltip":false,"tourProgress":false,"tourButtons":false,"closeButton":false,"tourSkip":false}">



</borda-component>
</borda-container>

<div id="overlay-only-code">

```ts
const instance = await borda.highlight(
  {
    target: '#element',
    title: '',
    description: '',
    placement: ComponentPlacement.BOTTOM_START,
  },
  {
    tourOverlay: { padding: 12, hasCloseOnBackdropClick: true },
    tourTooltip: false,
    tourProgress: false,
    tourButtons: false,
    closeButton: false,
    tourSkip: false,
  },
);
```

</div>

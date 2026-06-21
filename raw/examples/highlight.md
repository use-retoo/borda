# Highlight

> Spotlight a single element with or without tooltip.

Use `highlight()` to draw attention to a single element. You can show a full tooltip with buttons, or just the spotlight overlay with no UI.

## With tooltip

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Spotlight","description":"Single-element highlight — no multi-step navigation.","placement":"bottom-start"}],"tourProgress":false,"tourButtons":{"prev":false,"next":false,"finish":{"label":"Got it"}}}">



</borda-component>
</borda-container>

```ts
const instance = await borda.highlight(
  {
    target: '#element',
    title: 'Spotlight',
    description: 'Single-element highlight — no navigation.',
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

## Overlay only

Show just the spotlight cutout with no tooltip, buttons, or close button:

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"","description":"","placement":"bottom-start"}],"tourOverlay":{"padding":12,"hasCloseOnBackdropClick":true},"tourTooltip":false,"tourProgress":false,"tourButtons":false,"closeButton":false,"tourSkip":false}">



</borda-component>
</borda-container>

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

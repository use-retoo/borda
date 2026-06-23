# Animation

> Tooltip enter/exit effects — fade, scale, slide, or none.

<div id="animation-description">

Borda supports four animation effects for tooltip enter/exit transitions. Each effect can be applied independently to enter and exit.

</div>

## Fade

<div id="fade-demo">
<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Page header","description":"Every page starts with a header — the spotlight draws attention to it.","placement":"bottom-start"},{"target":"#animation-description","title":"Description","description":"Four animation effects — fade, scale, slide, and none. Each applied independently.","placement":"bottom-start"},{"target":"#fade","title":"Fade section","description":"The fade effect transitions opacity from 0 to 1. enterDuration 200ms, exitDuration 150ms.","placement":"middle-end"},{"target":"#fade-code","title":"Code","description":"Set enter and exit to AnimationEffect.FADE with independent durations.","placement":"top-end"}],"scroll":{"block":"center","duration":400},"animation":{"isEnabled":true,"tooltip":{"enter":"fade","exit":"fade","enterDuration":200,"exitDuration":150}}}">



</borda-component>
</borda-container>

<div id="fade-code">

```ts
await borda.mount({
  steps: [...],
  animation: {
    isEnabled: true,
    tooltip: {
      enter: AnimationEffect.FADE,
      exit: AnimationEffect.FADE,
      enterDuration: 200,
      exitDuration: 150,
    },
  },
});
```

</div>

## Scale

<div id="scale-demo">
<borda-container>
<borda-component :config="{"steps":[{"target":"#scale","title":"Scale section","description":"The tooltip scales from 0 to full size, anchored at its center.","placement":"bottom-start"},{"target":"#scale-code","title":"Code","description":"Set enter and exit to AnimationEffect.SCALE for a zoom effect.","placement":"top-end"}],"scroll":{"block":"center","duration":400},"animation":{"isEnabled":true,"tooltip":{"enter":"scale","exit":"scale","enterDuration":200,"exitDuration":150}}}">



</borda-component>
</borda-container>
</div>
</div>

<div id="scale-code">

```ts
await borda.mount({
  steps: [...],
  animation: {
    isEnabled: true,
    tooltip: {
      enter: AnimationEffect.SCALE,
      exit: AnimationEffect.SCALE,
      enterDuration: 200,
      exitDuration: 150,
    },
  },
});
```

</div>

## No animation

<div id="no-animation-demo">
<borda-container>
<borda-component :config="{"steps":[{"target":"#no-animation","title":"No animation","description":"The tooltip snaps to each position with zero transition time.","placement":"bottom-start"},{"target":"#no-animation-code","title":"Code","description":{"Set animation":"false globally to disable all animations at once.","placement":"top-end"}}],"scroll":{"block":"center","duration":400},"animation":false}">



</borda-component>
</borda-container>

<div id="no-animation-code">

```ts
await borda.mount({
  steps: [...],
  animation: false,
});
```

</div>
</div>

# Animation

> Tooltip enter/exit effects — fade, scale, slide, or none.

Borda supports four animation effects for tooltip enter/exit transitions. Each effect can be applied independently to enter and exit.

## Fade

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Fade","description":"Tooltip fades in and out.","placement":"bottom-start"},{"target":"#page-toc","title":"Step 2","description":"Transition between steps with fade effect.","placement":"top-center"}],"scroll":{"block":"center","duration":400},"animation":{"isEnabled":true,"tooltip":{"enter":"fade","exit":"fade","enterDuration":200,"exitDuration":150}}}">



</borda-component>
</borda-container>

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

## Scale

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Scale","description":"Tooltip scales from center.","placement":"bottom-start"},{"target":"#page-toc","title":"Step 2","description":"Transition between steps with scale effect.","placement":"top-center"}],"scroll":{"block":"center","duration":400},"animation":{"isEnabled":true,"tooltip":{"enter":"scale","exit":"scale","enterDuration":200,"exitDuration":150}}}">



</borda-component>
</borda-container>

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

## No animation

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"No animation","description":"Tooltip appears instantly.","placement":"bottom-start"}],"scroll":{"block":"center","duration":400},"animation":false}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [...],
  animation: false,
});
```

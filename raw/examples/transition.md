# Transition

> How the tooltip moves between steps — fade or glide.

The tooltip transition controls how it moves from one step to the next. **Fade** hides the tooltip while transitioning, then fades it in at the new position. **Glide** keeps it visible and slides it smoothly.

## Fade

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Fade transition","description":"Tooltip fades out, then fades in at the new position.","placement":"bottom-start"},{"target":"#page-toc","title":"Step 2","description":"The tooltip disappears between steps.","placement":"top-center"}],"scroll":{"block":"center","duration":400},"animation":{"tooltip":{"transition":"fade"}}}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [...],
  animation: {
    tooltip: { transition: BordaTooltipTransition.FADE },
  },
});
```

## Glide

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Glide transition","description":"Tooltip slides smoothly to the next position.","placement":"bottom-start"},{"target":"#page-toc","title":"Step 2","description":"The tooltip stays visible and glides.","placement":"top-center"}],"scroll":{"block":"center","duration":400},"animation":{"tooltip":{"transition":"glide"}}}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [...],
  animation: {
    tooltip: { transition: BordaTooltipTransition.GLIDE },
  },
});
```

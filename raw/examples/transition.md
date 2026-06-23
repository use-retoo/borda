# Transition

> How the tooltip moves between steps — fade or glide.

<div id="transition-description">

The tooltip transition controls how it moves from one step to the next. **Fade** hides the tooltip while transitioning, then fades it in at the new position. **Glide** keeps it visible and slides it smoothly.

</div>

## Fade

<div id="fade-demo">
<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Page header","description":"Every page starts with a header — the spotlight draws attention to it.","placement":"bottom-start"},{"target":"#transition-description","title":"Description","description":"Fade hides the tooltip while transitioning — glide keeps it visible and slides.","placement":"bottom-start"},{"target":"#fade","title":"Fade section","description":"The tooltip fades out at its current position, then fades in at the next step.","placement":"middle-end"},{"target":"#fade-code","title":"Code","description":"Set animation.tooltip.transition to fade for the default transition behavior.","placement":"top-end"}],"scroll":{"block":"center","duration":400},"animation":{"tooltip":{"transition":"fade"}}}">



</borda-component>
</borda-container>

<div id="fade-code">

```ts
await borda.mount({
  steps: [...],
  animation: {
    tooltip: { transition: BordaTooltipTransition.FADE },
  },
});
```

</div>

## Glide

<div id="glide-demo">
<borda-container>
<borda-component :config="{"steps":[{"target":"#glide","title":"Glide section","description":"The tooltip stays visible and slides smoothly to the next position.","placement":"bottom-start"},{"target":"#glide-code","title":"Code","description":"Set animation.tooltip.transition to glide for continuous motion.","placement":"top-end"}],"scroll":{"block":"center","duration":400},"animation":{"tooltip":{"transition":"glide"}}}">



</borda-component>
</borda-container>
</div>
</div>

<div id="glide-code">

```ts
await borda.mount({
  steps: [...],
  animation: {
    tooltip: { transition: BordaTooltipTransition.GLIDE },
  },
});
```

</div>

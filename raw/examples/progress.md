# Progress

> Progress indicator variants — dots, text, line, or none.

<div id="progress-description">

The progress indicator shows the user's position in the tour. Three visual variants are available, or disable it entirely.

</div>

## Dots

<div id="dots-demo">
<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Page header","description":"Every page starts with a header — the spotlight draws attention to it.","placement":"bottom-start"},{"target":"#progress-description","title":"Description","description":"Three visual variants — dots, text, and line. Or disable progress entirely.","placement":"bottom-start"},{"target":"#dots","title":"Dots section","description":"The default variant — a row of dots, one per step, the active one highlighted.","placement":"middle-end"},{"target":"#dots-code","title":"Code","description":"Set tourProgress.variant to dots — or pass false to hide it entirely.","placement":"top-end"}],"scroll":{"block":"center","duration":400},"tourProgress":{"variant":"dots"}}">



</borda-component>
</borda-container>

<div id="dots-code">

```ts
await borda.mount({
  steps: [...],
  tourProgress: { variant: BordaTourProgressVariant.DOTS },
});
```

</div>

## Text

<div id="text-demo">
<borda-container>
<borda-component :config="{"steps":[{"target":"#text","title":"Text counter","description":"Displays \"Step 1 of N\" — the format is customizable via the label prop.","placement":"bottom-start"},{"target":"#text-code","title":"Code","description":"Set tourProgress.variant to text for explicit step counts.","placement":"top-end"}],"scroll":{"block":"center","duration":400},"tourProgress":{"variant":"text"}}">



</borda-component>
</borda-container>
</div>
</div>

<div id="text-code">

```ts
await borda.mount({
  steps: [...],
  tourProgress: { variant: BordaTourProgressVariant.TEXT },
});
```

</div>

## Line

<div id="line-demo">
<borda-container>
<borda-component :config="{"steps":[{"target":"#line","title":"Line","description":"A horizontal bar fills from left to right as you advance through the tour.","placement":"bottom-start"},{"target":"#line-code","title":"Code","description":"Set tourProgress.variant to line for a continuous progress bar.","placement":"top-end"}],"scroll":{"block":"center","duration":400},"tourProgress":{"variant":"line"}}">



</borda-component>
</borda-container>

<div id="line-code">

```ts
await borda.mount({
  steps: [...],
  tourProgress: { variant: BordaTourProgressVariant.LINE },
});
```

</div>
</div>

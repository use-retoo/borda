# Progress

> Progress indicator variants — dots, text, line, or none.

The progress indicator shows the user's position in the tour. Three visual variants are available, or disable it entirely.

## Dots

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Step 1","description":"Progress shows as dots.","placement":"bottom-start"},{"target":"#page-content","title":"Step 2","description":"One dot per step.","placement":"top-start"},{"target":"#page-toc","title":"Step 3","description":"Completed dots are filled.","placement":"top-center"}],"scroll":{"block":"center","duration":400},"tourProgress":{"variant":"dots"}}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [...],
  tourProgress: { variant: BordaTourProgressVariant.DOTS },
});
```

## Text

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Step 1","description":"Progress shows as text.","placement":"bottom-start"},{"target":"#page-content","title":"Step 2","description":"Displays \"Step 2 of 3\".","placement":"top-start"},{"target":"#page-toc","title":"Step 3","description":"Text updates on each step.","placement":"top-center"}],"scroll":{"block":"center","duration":400},"tourProgress":{"variant":"text"}}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [...],
  tourProgress: { variant: BordaTourProgressVariant.TEXT },
});
```

## Line

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Step 1","description":"Progress shows as a line.","placement":"bottom-start"},{"target":"#page-content","title":"Step 2","description":"Linear progress bar fills as you advance.","placement":"top-start"},{"target":"#page-toc","title":"Step 3","description":"Full line means tour is complete.","placement":"top-center"}],"scroll":{"block":"center","duration":400},"tourProgress":{"variant":"line"}}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [...],
  tourProgress: { variant: BordaTourProgressVariant.LINE },
});
```

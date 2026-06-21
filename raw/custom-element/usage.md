# Usage

> Use the custom element in HTML with attributes and properties.

After registration, use `<borda-tour-widget>` like any HTML element. Pass configuration through attributes or JavaScript properties.

## HTML attributes

```html
<borda-tour-widget></borda-tour-widget>
```

## JavaScript properties

Set the config programmatically after the element is in the DOM:

```ts
const widget = document.querySelector('borda-tour-widget');

widget.config = {
  steps: [
    {
      target: '#sidebar',
      title: 'Navigation',
      description: 'Browse sections here.',
      placement: 'middle-end',
    },
  ],
};
```

## Framework integration

The custom element works in any framework — React, Vue, Angular, Svelte, or vanilla HTML:

```html
<!-- Vue -->
<borda-tour-widget :config="tourConfig" />

<!-- React -->
<borda-tour-widget config={tourConfig} />

<!-- Vanilla HTML -->
<script>
  const el = document.querySelector('borda-tour-widget');
  el.config = { steps: [...] };
</script>
```

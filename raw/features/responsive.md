# Responsive

> Apply different component configs at different viewport widths.

Responsive breakpoints let you apply different component overrides at different viewport widths. Borda listens to `matchMedia` changes and applies the matching breakpoint's config as a named override layer.

## Config

The `responsive` key maps breakpoint widths (in pixels) to partial config overrides:

```ts
await borda.mount({
  steps: [
    {
      target: '#element',
      title: 'Title',
      description: 'Description',
      placement: 'bottom-center',
    },
  ],
  responsive: {
    480: {
      tourTooltip: {
        padding: 8,
      },
      tourButtons: {
        skip: false,
      },
    },
    768: {
      tourTooltip: {
        padding: 16,
      },
    },
  },
});
```

When the viewport width matches a breakpoint, its overrides are merged on top of the base config. Multiple breakpoints can be active simultaneously — they stack in ascending order.

## How it works

1. Borda creates `matchMedia` listeners for each breakpoint key.
2. When a breakpoint matches, its overrides are applied as a named layer in the overrides system.
3. When the viewport changes, the previous breakpoint's overrides are removed and the new ones applied.
4. The widget re-renders reactively without remounting.

## Runtime API

Read the currently active breakpoint:

```ts
instance.responsive.activeBreakpoint; // e.g. 768, or null if none matched
```

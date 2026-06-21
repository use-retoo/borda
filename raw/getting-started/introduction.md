# Introduction

> Embeddable onboarding widget for any website. Framework-agnostic, SSR-safe.

## What is Borda?

Borda is an embeddable onboarding widget that guides users through your interface step by step. It renders a spotlight overlay around target elements, paired with a tooltip that displays a title, description, image, and navigation buttons — all configurable per step.

Borda works on any type of site — SaaS dashboards, landing pages, e-commerce stores, documentation portals — without requiring a specific framework. The widget mounts into any container or directly into `document.body` as a floating overlay.

Built with [Svelte 5](https://svelte.dev), Borda compiles down to vanilla JavaScript with no framework runtime. The output integrates into React, Vue, Angular, or plain HTML without dependency conflicts. Distribution formats include ES Module, UMD, and CommonJS.

<callout color="info">

Borda is a fully open-source, non-commercial project. It's built and maintained by a small team in their free time with the goal of helping developers build better projects. If you encounter bugs or rough edges — we'd appreciate your patience and a [GitHub issue](https://github.com/use-retoo/borda) over frustration.

</callout>

## See it in action

The only required field is `steps` — an array of step definitions. Each step specifies a `target` element, a `title`, a `description`, and a `placement` for the tooltip. Steps can also carry an `image`, and the whole tour can show a `tourProgress` indicator.

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Section heading","description":"Each section starts with a clear heading.","placement":"bottom-start"},{"target":"#page-content","title":"Images","description":"Steps can carry an image alongside the title and description.","image":{"src":"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='240'%3E%3Crect width='480' height='240' fill='%23d4d4d8'/%3E%3C/svg%3E","alt":"Placeholder image"},"placement":"middle-end"},{"target":"#page-toc","title":"On this page","description":"Quick links to every heading, so readers can skip ahead.","placement":"top-end"}],"tourProgress":{"variant":"dots"}}">



</borda-component>
</borda-container>

```ts
const instance = await borda.mount({
  steps: [
    {
      target: '#page-header',
      title: 'Section heading',
      description: 'Each section starts with a clear heading.',
      placement: ComponentPlacement.BOTTOM_START,
    },
    {
      target: '#page-content',
      title: 'Images',
      description: 'Steps can carry an image alongside the title and description.',
      image: {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='240'%3E%3Crect width='480' height='240' fill='%23d4d4d8'/%3E%3C/svg%3E",
        alt: 'Placeholder image',
      },
      placement: ComponentPlacement.MIDDLE_END,
    },
    {
      target: '#page-toc',
      title: 'On this page',
      description: 'Quick links to every heading, so readers can skip ahead.',
      placement: ComponentPlacement.TOP_END,
    },
  ],
  tourProgress: {
    variant: BordaTourProgressVariant.DOTS,
  },
});
```

<callout icon="i-lucide-settings-2" to="/examples/basic-setup">

See the **Basic Setup** example for a complete onboarding flow with multiple steps.

</callout>

## Features

<field-group>
<field name="Guided tours" type="multi-step, lifecycle hooks">

Define an ordered list of steps with per-step target elements, tooltips, images, and async preparation hooks.

</field>

<field name="Spotlight overlay" type="configurable cutout">

Full-screen backdrop with a cutout around the target element. Configurable padding, border radius, and animation.

</field>

<field name="Tooltips" type="auto-placement, arrow, image">

Positioned tooltips with title, description, image, and arrow. Auto-flips to stay in viewport.

</field>

<field name="Navigation" type="buttons + keyboard">

Built-in prev/next/finish/skip buttons and keyboard navigation with ArrowRight, ArrowLeft, and Escape.

</field>

<field name="Skip feature" type="localStorage">

"Don't show again" checkbox with persistent storage — the onboarding won't replay for returning users.

</field>

<field name="Highlight" type="single element spotlight">

Spotlight a single element without a full tour using the `highlight()` shortcut.

</field>

<field name="Responsive" type="breakpoint overrides">

Apply different component configs at different viewport widths via matchMedia breakpoints.

</field>

<field name="Runtime updates" type="mergeConfig / setConfig">

Patch or replace the entire config without unmounting.

</field>
</field-group>

## Bundle size

The production bundle weighs under **40 KB gzipped** (JS + CSS combined). Zero runtime dependencies — nothing is loaded beyond the assets you provide.

<callout icon="i-lucide-arrow-right" to="/distribution/bundle-size">

Full breakdown by format in the **Bundle Size** reference.

</callout>

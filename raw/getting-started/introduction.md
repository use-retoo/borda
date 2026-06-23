# Introduction

> Embeddable onboarding widget for any website. Framework-agnostic, SSR-safe.

## What is Borda?

<div id="what-is-borda-description">

Borda is an embeddable onboarding widget that guides users through your interface step by step. It renders a spotlight overlay around target elements, paired with a tooltip that displays a title, description, image, and navigation buttons — all configurable per step.

</div>

Borda works on any type of site — SaaS dashboards, landing pages, e-commerce stores, documentation portals — without requiring a specific framework. The widget mounts into any container or directly into `document.body` as a floating overlay.

Built with [Svelte 5](https://svelte.dev), Borda compiles down to vanilla JavaScript with no framework runtime. The output integrates into React, Vue, Angular, or plain HTML without dependency conflicts. Distribution formats include ES Module, UMD, and CommonJS.

<callout color="info">

Borda is a fully open-source, non-commercial project. It's built and maintained by a small team in their free time with the goal of helping developers build better projects. If you encounter bugs or rough edges — we'd appreciate your patience and a [GitHub issue](https://github.com/use-retoo/borda) over frustration.

</callout>

## See it in action

The only required field is `steps` — an array of step definitions. Each step specifies a `target` element, a `title`, a `description`, and a `placement` for the tooltip. This tour runs on the page you're reading right now: every target below is a real heading or feature card further down, and each step uses a different `placement` to show the tooltip positioning itself around its target.

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Page header","description":"Every page has a header with a title and description — Borda spotlights it as the starting point of the tour.","placement":"bottom-center"},{"target":"#what-is-borda","title":"What is Borda?","description":"The first section heading on the page. Borda can target any element with a CSS selector — headings, paragraphs, cards, or containers.","placement":"bottom-start"},{"target":"#what-is-borda-description","title":"Description","description":"A paragraph of text right below the heading. The spotlight wraps around just this block — not the whole section.","placement":"bottom-start"},{"target":"#features","title":"Features","description":"The entire Features section — field cards, icons, and descriptions — wrapped in a single spotlight. One step can cover a large area.","placement":"middle-start"},{"target":"#bundle-size","title":"Bundle size","description":"Under 40 KB gzipped. Zero runtime dependencies. The spotlight moves to the bottom of the page for this step.","placement":"top-start"},{"target":"#bundle-callout","title":"Full breakdown","description":"Callouts, links, and inline elements are valid targets too. This one links to the full bundle size reference.","placement":"top-center"}],"tourProgress":{"variant":"dots"}}">



</borda-component>
</borda-container>

```ts
import { useBorda, ComponentPlacement } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

const instance = await borda.mount({
  steps: [
    {
      target: '#page-header',
      title: 'Page header',
      description: 'Every page has a header with a title and description — Borda spotlights it as the starting point of the tour.',
      placement: ComponentPlacement.BOTTOM_CENTER,
    },
    {
      target: '#what-is-borda',
      title: 'What is Borda?',
      description: 'The first section heading on the page. Borda can target any element with a CSS selector.',
      placement: ComponentPlacement.BOTTOM_START,
    },
    {
      target: '#what-is-borda-description',
      title: 'Description',
      description: 'A paragraph of text right below the heading. The spotlight wraps around just this block.',
      placement: ComponentPlacement.BOTTOM_START,
    },
    {
      target: '#features',
      title: 'Features',
      description: 'The entire Features section wrapped in a single spotlight. One step can cover a large area.',
      placement: ComponentPlacement.MIDDLE_START,
    },
    {
      target: '#bundle-size',
      title: 'Bundle size',
      description: 'Under 40 KB gzipped. Zero runtime dependencies.',
      placement: ComponentPlacement.TOP_START,
    },
    {
      target: '#bundle-callout',
      title: 'Full breakdown',
      description: 'Callouts, links, and inline elements are valid targets too.',
      placement: ComponentPlacement.TOP_CENTER,
    },
  ],
});
```

<callout icon="i-lucide-settings-2" to="/examples/basic-setup">

See the **Basic Setup** example for a complete onboarding flow with multiple steps.

</callout>

## Features

<field-group>
<field name="Guided tours" type="multi-step, lifecycle hooks" id="feature-tours">

Define an ordered list of steps with per-step target elements, tooltips, images, and async preparation hooks.

</field>

<field name="Spotlight overlay" type="configurable cutout" id="feature-overlay">

Full-screen backdrop with a cutout around the target element. Configurable padding, border radius, and animation.

</field>

<field name="Tooltips" type="auto-placement, arrow, image" id="feature-tooltips">

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

<div id="bundle-callout">
<callout icon="i-lucide-arrow-right" to="/distribution/bundle-size">

Full breakdown by format in the **Bundle Size** reference.

</callout>
</div>

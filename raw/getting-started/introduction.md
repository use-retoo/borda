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

The only required field is `steps` — an array of step definitions. Each step specifies a `target` element, a `title`, a `description`, and a `placement` for the tooltip. This tour runs on the page you're reading right now: every target below is a real heading or feature card further down, and each step uses a different `placement` to show the tooltip positioning itself around its target.

<borda-container>
<borda-component :config="{"steps":[{"target":"#what-is-borda","title":"What is Borda?","description":"An embeddable widget — a spotlight overlay plus a positioned tooltip — driven by a plain array of steps. The dimmed backdrop and tooltip you're reading are a single `mount()` call.","placement":"bottom-center"},{"target":"#feature-tours","title":"Guided, multi-step tours","description":"Chain steps together, each with its own target, title, description, and placement. Async `prepareElement` hooks can expand a panel or wait for data before a step shows.","placement":"middle-start"},{"target":"#feature-overlay","title":"Spotlight overlay","description":"A backdrop dims the page with a cutout around the active element. Padding, border radius, and the transition between cutouts are all configurable.","placement":"middle-start"},{"target":"#feature-tooltips","title":"Tooltips that adapt","description":"Tooltips auto-flip to stay inside the viewport and can carry an image above the title, like this one. Components can also be swapped per step — this progress indicator just switched from dots to a line.","image":{"src":"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='240'%3E%3Crect width='480' height='240' fill='%23d4d4d8'/%3E%3C/svg%3E","alt":"Placeholder image"},"placement":"top-center","tourProgress":{"variant":"line"}}],"tourProgress":{"variant":"dots"}}">



</borda-component>
</borda-container>

```ts
import {
  useBorda,
  ComponentPlacement,
  BordaTourProgressVariant,
} from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

const instance = await borda.mount({
  steps: [
    {
      target: '#what-is-borda',
      title: 'What is Borda?',
      description: "An embeddable widget — a spotlight overlay plus a positioned tooltip — driven by a plain array of steps. The dimmed backdrop and tooltip you're reading are a single mount() call.",
      placement: ComponentPlacement.BOTTOM_CENTER,
    },
    {
      target: '#feature-tours',
      title: 'Guided, multi-step tours',
      description: 'Chain steps together, each with its own target, title, description, and placement. Async prepareElement hooks can expand a panel or wait for data before a step shows.',
      placement: ComponentPlacement.MIDDLE_START,
    },
    {
      target: '#feature-overlay',
      title: 'Spotlight overlay',
      description: 'A backdrop dims the page with a cutout around the active element. Padding, border radius, and the transition between cutouts are all configurable.',
      placement: ComponentPlacement.MIDDLE_START,
    },
    {
      target: '#feature-tooltips',
      title: 'Tooltips that adapt',
      description: 'Tooltips auto-flip to stay inside the viewport and can carry an image above the title, like this one. Components can also be swapped per step — this progress indicator just switched from dots to a line.',
      image: {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='240'%3E%3Crect width='480' height='240' fill='%23d4d4d8'/%3E%3C/svg%3E",
        alt: 'Placeholder image',
      },
      placement: ComponentPlacement.TOP_CENTER,
      tourProgress: {
        variant: BordaTourProgressVariant.LINE,
      },
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

<callout icon="i-lucide-arrow-right" to="/distribution/bundle-size">

Full breakdown by format in the **Bundle Size** reference.

</callout>

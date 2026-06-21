# Overview

> Structure of BordaConfig and the principle of disabling components with false.

Every aspect of the tour — from step definitions to the appearance of each UI element — is controlled through a single configuration object, `BordaConfig`, passed to `borda.mount()`. The only required field is `steps`; everything else has a sensible default or can be disabled entirely.

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Section heading","description":"Each page opens with a title and short description.","placement":"bottom-start"},{"target":"#page-content","title":"Main content","description":"The body of the page — text, tables, and live demos like this one.","placement":"middle-end"},{"target":"#page-toc","title":"On this page","description":"Quick links to every heading on the current page.","placement":"top-end"}],"tourProgress":{"variant":"dots"}}">



</borda-component>
</borda-container>

```ts
import { useBorda, ComponentPlacement, BordaTourProgressVariant } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

const instance = await borda.mount({
  steps: [
    {
      target: '#nav-sidebar',
      title: 'Navigation',
      description: 'Every section is one click away.',
      placement: ComponentPlacement.MIDDLE_END,
    },
    {
      target: '#search-bar',
      title: 'Search',
      description: 'Find any page or setting instantly.',
      placement: ComponentPlacement.BOTTOM_CENTER,
    },
    {
      target: '#main-content',
      title: 'Main area',
      description: 'Your primary content lives here.',
      placement: ComponentPlacement.MIDDLE_START,
    },
    {
      target: '#user-menu',
      title: 'Account',
      description: 'Manage your profile and preferences.',
      placement: ComponentPlacement.BOTTOM_END,
    },
  ],
  tourProgress: {
    variant: BordaTourProgressVariant.DOTS,
  },
});
```

## Config structure

`BordaConfig` combines component overrides and feature configs:

<table>
<thead>
  <tr>
    <th>
      Key
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        steps
      </code>
    </td>
    
    <td>
      Array of step definitions. <strong>
        Required.
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        size
      </code>
    </td>
    
    <td>
      Widget size — <code>
        xs
      </code>
      
      , <code>
        sm
      </code>
      
      , <code>
        md
      </code>
      
      , <code>
        lg
      </code>
      
      , <code>
        xl
      </code>
      
      , <code>
        xxl
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        shape
      </code>
    </td>
    
    <td>
      Widget shape — <code>
        circle
      </code>
      
      , <code>
        square
      </code>
      
      , <code>
        portrait
      </code>
      
      , <code>
        landscape
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        container
      </code>
    </td>
    
    <td>
      Outer container props — custom classes/styles
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tourOverlay
      </code>
    </td>
    
    <td>
      Spotlight overlay. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tourTooltip
      </code>
    </td>
    
    <td>
      Tooltip with title/description. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tourImage
      </code>
    </td>
    
    <td>
      Image inside the tooltip. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tourButtons
      </code>
    </td>
    
    <td>
      Prev/next/finish/skip buttons. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tourProgress
      </code>
    </td>
    
    <td>
      Progress indicator. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tourSkip
      </code>
    </td>
    
    <td>
      "Don't show again" checkbox. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        closeButton
      </code>
    </td>
    
    <td>
      Close button. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tour
      </code>
    </td>
    
    <td>
      Tour behavior — startStep, lifecycle callbacks, keyboard control
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        visibility
      </code>
    </td>
    
    <td>
      Initial visibility state and animation
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        responsive
      </code>
    </td>
    
    <td>
      Breakpoint-specific overrides
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scroll
      </code>
    </td>
    
    <td>
      Smooth scroll to target. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        skip
      </code>
    </td>
    
    <td>
      Skip feature persistence. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        animation
      </code>
    </td>
    
    <td>
      Tooltip/overlay animations. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
</tbody>
</table>

## Disabling components

Pass `false` to any component key to remove it from the tour entirely:

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Quiet mode","description":"No buttons, no progress dots, no skip checkbox, no close button — just the spotlight and this card.","placement":"bottom-start"}],"tourSkip":false,"tourButtons":false,"tourProgress":false,"closeButton":false}">



</borda-component>
</borda-container>

Compare this to the live demo above the fold: that one shows every component enabled with progress dots; this one strips them all down to the spotlight and tooltip text.

```ts
await borda.mount({
  steps: [
    {
      target: '#announcement-banner',
      title: 'New feature available',
      description: 'A one-off spotlight with no navigation chrome — pair it with your own dismiss logic.',
      placement: ComponentPlacement.BOTTOM_CENTER,
    },
  ],
  tourSkip: false,
  tourButtons: false,
  tourProgress: false,
  closeButton: false,
});
```

This is different from hiding — a disabled component is never rendered in the DOM.

## Runtime updates

After mount, modify any config property through the instance — useful for reacting to screen size, user plan, or A/B test variant without unmounting:

```ts
import { useBorda, ComponentSize } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

const instance = await borda.mount({
  steps: [
    {
      target: '#trial-banner',
      title: "You're on a free trial",
      description: 'Upgrade any time from account settings.',
      placement: 'bottom-center',
    },
  ],
});

// Deep merge — only the specified fields are updated
// e.g. enlarge the widget and hide skip once the user is on their 3rd session
instance.config.mergeConfig({
  size: ComponentSize.LG,
  tourButtons: { skip: false },
});

// Full replacement — e.g. switch to a different flow after the user upgrades
instance.config.setConfig({
  steps: [
    {
      target: '#billing-section',
      title: "You're on the Pro plan",
      description: 'Manage your subscription and invoices here.',
      placement: 'bottom-center',
    },
  ],
});
```

Both methods trigger a reactive update — the widget re-renders immediately without remounting.

## Customization

Most components accept `customClasses` and `customStyles` for visual overrides without modifying the source. Classes are merged with the defaults; styles are applied as inline CSS.

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Branded tooltip","description":"This card uses customStyles to override the border radius, background, and border color.","placement":"bottom-start"}],"tourTooltip":{"customStyles":{"root":{"borderRadius":"4px","background":"#fafaf9","border":"2px solid"}}}}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [
    {
      target: '#cta-button',
      title: 'Branded tooltip',
      description: 'Custom classes and inline styles, no source modification required.',
      placement: ComponentPlacement.BOTTOM_CENTER,
    },
  ],
  tourTooltip: {
    customClasses: {
      root: 'my-tooltip',
      title: 'text-lg font-bold',
    },
    customStyles: {
      root: {
        borderRadius: '4px',
        background: '#fafaf9',
        border: '2px solid #18181b',
      },
    },
  },
});
```

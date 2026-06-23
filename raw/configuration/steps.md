# Steps

> Define tour steps with target elements, titles, descriptions, images, and lifecycle hooks.

<div id="steps-description">

Steps are the core of any tour. Each step defines which element to spotlight, what content to show in the tooltip, and optional lifecycle hooks that fire during navigation.

</div>

## Config

<table>
<thead>
  <tr>
    <th>
      Property
    </th>
    
    <th>
      Type
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
        target
      </code>
    </td>
    
    <td>
      <code>
        string | HTMLElement | BordaStepTargetQuery
      </code>
    </td>
    
    <td>
      Element to spotlight. CSS selector, HTMLElement, or structured query. <strong>
        Required.
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        title
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Tooltip heading text. <strong>
        Required.
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        description
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Tooltip body text. <strong>
        Required.
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        image
      </code>
    </td>
    
    <td>
      <code>
        string | BordaStepImage
      </code>
    </td>
    
    <td>
      Image shown above the tooltip heading. A string sets the source; an object carries its own alt.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        placement
      </code>
    </td>
    
    <td>
      <code>
        ComponentPlacement
      </code>
    </td>
    
    <td>
      Tooltip placement relative to the target.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        prepareElement
      </code>
    </td>
    
    <td>
      <code>
        () => Promise<void> | void
      </code>
    </td>
    
    <td>
      Async hook called before entering this step. Navigation waits for it to resolve.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        onBeforeHighlighted
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Fires before the target is highlighted, after <code>
        prepareElement
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        onHighlighted
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Fires after the target is highlighted and the step index is updated.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        onDeselected
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Fires when navigating away from this step.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        onNext
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Step-level next handler; fires alongside the tour-level <code>
        onNext
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        onPrev
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Step-level prev handler; fires alongside the tour-level <code>
        onPrev
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

## Basic example

<borda-container>
<borda-component :config="{"steps":[{"target":"#steps-description","title":"Description","description":"Steps are the core of any tour — each one defines a target, tooltip content, and optional hooks.","placement":"bottom-start"},{"target":"#config","title":"Config table","description":"The table lists every step property — target, title, description, placement are required.","placement":"middle-end"},{"target":"#target-resolution","title":"Target resolution","description":"The target field accepts a CSS selector, a direct HTMLElement, or a structured query with data attributes.","placement":"bottom-start"},{"target":"#images","title":"Images","description":"Add an image above the tooltip heading with a URL string or an object with src and alt.","placement":"middle-end"},{"target":"#per-step-component-overrides","title":"Per-step overrides","description":"Each step can override global component settings — pass false to disable a component for that step only.","placement":"bottom-start"},{"target":"#lifecycle-hooks","title":"Lifecycle hooks","description":"Use prepareElement for async setup before a step is shown — expand a panel, scroll to an element, or fetch data.","placement":"middle-end"},{"target":"#interface","title":"Interface","description":"The TypeScript interface defines the full shape of a BordaStep — target, title, description, placement, and optional hooks.","placement":"top-end"}]}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [
    {
      target: '#sidebar',
      title: 'Navigation',
      description: 'Use the sidebar to browse different sections.',
      placement: ComponentPlacement.MIDDLE_END,
    },
    {
      target: '#search',
      title: 'Search',
      description: 'Find anything quickly with the search bar.',
      placement: ComponentPlacement.BOTTOM_CENTER,
    },
    {
      target: '#settings',
      title: 'Settings',
      description: 'Customize your experience here.',
      placement: ComponentPlacement.MIDDLE_START,
    },
    {
      target: '#help',
      title: 'Need help?',
      description: 'Open the docs link from anywhere in the app.',
      placement: ComponentPlacement.TOP_END,
    },
  ],
});
```

## Target resolution

The `target` field accepts three formats:

```ts
// CSS selector string
{ target: '#my-element' }

// Direct HTMLElement reference
{ target: document.getElementById('my-element') }

// Structured query (data attributes)
{ target: { id: 'my-element', class: 'active', data: { name: 'tour-target', value: 'step-1' } } }
```

## Images

Add an image above the tooltip heading:

<borda-container>
<borda-component :config="{"steps":[{"target":"#images","title":"With an image","description":"Images render above the title, inset within the tooltip padding by default.","image":{"src":"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='240'%3E%3Crect width='480' height='240' fill='%23d4d4d8'/%3E%3C/svg%3E","alt":"Placeholder image"},"placement":"middle-end"}]}">



</borda-component>
</borda-container>

```ts
// Simple string (empty alt)
{ target: '#el', title: 'Title', description: 'Text', image: '/tour/step-1.png' }

// Object with alt text
{ target: '#el', title: 'Title', description: 'Text', image: { src: '/tour/step-1.png', alt: 'Dashboard overview' } }
```

## Per-step component overrides

Each step can override global component settings. Pass `false` to disable a component for that step only:

```ts
await borda.mount({
  steps: [
    {
      target: '#intro',
      title: 'Welcome',
      description: 'Getting started.',
      placement: ComponentPlacement.BOTTOM_CENTER,
      tourButtons: { skip: false },
      tourProgress: false,
    },
    {
      target: '#details',
      title: 'Details',
      description: 'More info here.',
      placement: ComponentPlacement.MIDDLE_END,
      closeButton: false,
    },
  ],
});
```

## Lifecycle hooks

Use `prepareElement` for async setup before a step is shown — expand a panel, scroll to an element, or fetch data:

```ts
{
  target: '#hidden-panel',
  title: 'Advanced settings',
  description: 'These options are for power users.',
  placement: ComponentPlacement.MIDDLE_END,
  prepareElement: async () => {
    await expandSettingsPanel();
    await waitForElement('#hidden-panel');
  },
}
```

## Interface

```ts
interface BordaStep {
  target: BordaStepTarget;
  title: string;
  description: string;
  image?: BordaStepImageSource;
  placement: ComponentPlacement;
  onBeforeHighlighted?: () => void;
  onHighlighted?: () => void;
  onDeselected?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  prepareElement?: () => Promise<void> | void;
}
```

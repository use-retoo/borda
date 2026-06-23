# Animation

> Configure enter/exit animations for the tooltip and overlay spotlight transitions.

<div id="animation-description">

Borda supports configurable animations for tooltip enter/exit and overlay spotlight transitions. All animation settings are grouped under the `animation` config key.

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
      Default
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
        isEnabled
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      Master switch for all animations
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tooltip.enter
      </code>
    </td>
    
    <td>
      <code>
        AnimationEffect
      </code>
    </td>
    
    <td>
      <code>
        FADE
      </code>
    </td>
    
    <td>
      Tooltip enter effect
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tooltip.exit
      </code>
    </td>
    
    <td>
      <code>
        AnimationEffect
      </code>
    </td>
    
    <td>
      <code>
        FADE
      </code>
    </td>
    
    <td>
      Tooltip exit effect
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tooltip.enterDuration
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        200
      </code>
    </td>
    
    <td>
      Enter animation duration in ms
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tooltip.exitDuration
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        150
      </code>
    </td>
    
    <td>
      Exit animation duration in ms
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tooltip.easing
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      <code>
        ease-out
      </code>
    </td>
    
    <td>
      CSS easing function
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tooltip.appearance
      </code>
    </td>
    
    <td>
      <code>
        BordaScrollAppearance
      </code>
    </td>
    
    <td>
      <code>
        AFTER_SCROLL
      </code>
    </td>
    
    <td>
      When to reveal the tooltip relative to scroll animation
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tooltip.transition
      </code>
    </td>
    
    <td>
      <code>
        BordaTooltipTransition
      </code>
    </td>
    
    <td>
      <code>
        FADE
      </code>
    </td>
    
    <td>
      How the tooltip moves between steps
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        overlay.transitionDuration
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        350
      </code>
    </td>
    
    <td>
      Spotlight transition duration between steps
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        overlay.easing
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      <code>
        ease-in-out
      </code>
    </td>
    
    <td>
      CSS easing for spotlight movement
    </td>
  </tr>
</tbody>
</table>

## Tooltip transition

Controls how the tooltip moves between steps:

<table>
<thead>
  <tr>
    <th>
      Transition
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
        FADE
      </code>
    </td>
    
    <td>
      Hide the tooltip while transitioning, then fade it in at the new step
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        GLIDE
      </code>
    </td>
    
    <td>
      Keep the tooltip visible and glide its position to the new step
    </td>
  </tr>
</tbody>
</table>

<borda-container>
<borda-component :config="{"steps":[{"target":"#animation-description","title":"Configurable animations","description":"All animation settings are grouped under the animation config key.","placement":"bottom-start"},{"target":"#tooltip-transition","title":"Tooltip transition","description":"Controls how the tooltip moves between steps — fade or glide.","placement":"middle-end"},{"target":"#config","title":"Config table","description":"The table lists all animation properties — effects, durations, easing, and overlay transitions.","placement":"top-end"}],"animation":{"tooltip":{"transition":"glide"}}}">



</borda-component>
</borda-container>

```ts
import { BordaTooltipTransition } from '@retoo/borda';

await borda.mount({
  steps: [...],
  animation: {
    tooltip: {
      transition: BordaTooltipTransition.GLIDE,
    },
  },
});
```

## Animation effects

<table>
<thead>
  <tr>
    <th>
      Effect
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
        NONE
      </code>
    </td>
    
    <td>
      No animation
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        FADE
      </code>
    </td>
    
    <td>
      Opacity transition
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SCALE
      </code>
    </td>
    
    <td>
      Scale from center
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        SLIDE
      </code>
    </td>
    
    <td>
      Slide from edge
    </td>
  </tr>
</tbody>
</table>

<borda-container>
<borda-component :config="{"steps":[{"target":"#config","title":"Full config","description":"Every animation property lives under one config key — effects, durations, and easing.","placement":"bottom-start"},{"target":"#animation-effects","title":"Animation effects","description":"Four effects available — none, fade, scale, and slide. Each can be applied independently.","placement":"top-end"},{"target":"#disabling-animation","title":"Disabling","description":"Pass false to the animation key to disable all animations globally.","placement":"middle-end"}],"animation":{"isEnabled":true,"tooltip":{"enter":"scale","exit":"scale","enterDuration":250,"exitDuration":150}}}">



</borda-component>
</borda-container>

```ts
import { AnimationEffect } from '@retoo/borda';

await borda.mount({
  steps: [
    {
      target: '#element',
      title: 'Title',
      description: 'Description',
      placement: 'bottom-center',
    },
  ],
  animation: {
    isEnabled: true,
    tooltip: {
      enter: AnimationEffect.FADE,
      exit: AnimationEffect.FADE,
      enterDuration: 300,
      exitDuration: 200,
    },
    overlay: {
      transitionDuration: 400,
    },
  },
});
```

## Disabling animation

Pass `false` to disable all animations globally:

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
  animation: false,
});
```

## Runtime API

Read the resolved animation settings at runtime:

```ts
instance.animation.isEnabled;
instance.animation.tooltip;
instance.animation.overlay;
```

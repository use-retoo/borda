# Scroll

> Configure smooth scroll to bring the active step target into view.

<div id="scroll-description">

The scroll feature smoothly scrolls the page to bring the active step's target element into view. It uses a custom `requestAnimationFrame` animation so `duration`, `easing`, and `offset` are fully configurable.

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
        block
      </code>
    </td>
    
    <td>
      <code>
        ScrollLogicalPosition
      </code>
    </td>
    
    <td>
      <code>
        center
      </code>
    </td>
    
    <td>
      Vertical alignment — <code>
        start
      </code>
      
      , <code>
        center
      </code>
      
      , <code>
        end
      </code>
      
      , <code>
        nearest
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        inline
      </code>
    </td>
    
    <td>
      <code>
        ScrollLogicalPosition
      </code>
    </td>
    
    <td>
      <code>
        nearest
      </code>
    </td>
    
    <td>
      Horizontal alignment
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        duration
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        400
      </code>
    </td>
    
    <td>
      Animation duration in ms. <code>
        0
      </code>
      
       for instant jump.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        easing
      </code>
    </td>
    
    <td>
      <code>
        BordaScrollEasing
      </code>
    </td>
    
    <td>
      <code>
        ease-in-out
      </code>
    </td>
    
    <td>
      Built-in preset or custom function
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        offset.x
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        0
      </code>
    </td>
    
    <td>
      Horizontal pixel offset
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        offset.y
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        0
      </code>
    </td>
    
    <td>
      Vertical pixel offset
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isLocked
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Block manual page scroll while the tour is active. Set <code>
        true
      </code>
      
       to lock scrolling.
    </td>
  </tr>
</tbody>
</table>

<borda-container>
<borda-component :config="{"steps":[{"target":"#scroll-description","title":"Smooth scroll","description":"The scroll feature uses a custom requestAnimationFrame animation — duration, easing, and offset are configurable.","placement":"bottom-start"},{"target":"#config","title":"Config table","description":"The table lists every scroll property — block alignment, duration, easing, pixel offsets, and scroll lock.","placement":"middle-end"},{"target":"#easing-presets","title":"Easing presets","description":"Five built-in presets from linear to ease-in-out, or pass a custom function.","placement":"top-end"}],"scroll":{"block":"center","duration":600,"easing":"ease-in-out","offset":{"y":-20}}}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [
    {
      target: '#intro-section',
      title: 'Welcome',
      description: 'First step starts at the top of the page.',
      placement: 'bottom-center',
    },
    {
      target: '#bottom-section',
      title: 'Down here',
      description: 'The page scrolled to this element automatically.',
      placement: 'top-center',
    },
  ],
  scroll: {
    block: 'center',
    duration: 600,
    easing: 'ease-in-out',
    offset: { y: -20 },
  },
});
```

## Easing presets

<table>
<thead>
  <tr>
    <th>
      Preset
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
        linear
      </code>
    </td>
    
    <td>
      Constant speed
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ease
      </code>
    </td>
    
    <td>
      Default browser easing
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ease-in
      </code>
    </td>
    
    <td>
      Slow start, fast end
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ease-out
      </code>
    </td>
    
    <td>
      Fast start, slow end
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ease-in-out
      </code>
    </td>
    
    <td>
      Slow start and end
    </td>
  </tr>
</tbody>
</table>

Pass a custom function for full control:

```ts
scroll: {
  easing: (progress) => progress * progress, // quadratic ease-in
}
```

## Disabling scroll

Pass `false` to disable automatic scrolling entirely:

```ts
await borda.mount({
  steps: [...],
  scroll: false,
});
```

When `animation.isEnabled` is `false` globally, scroll still runs but becomes an instant jump regardless of `duration`.

## Runtime API

```ts
// Scroll to any element programmatically
await instance.scroll.scrollTo(document.getElementById('target'));

// Check if a scroll animation is in progress
instance.scroll.isScrolling;
```

# Scroll API

> Programmatically scroll the page to bring elements into view.

The scroll API provides smooth scroll-to-target functionality. Access it through `instance.scroll`.

## Properties

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
        isScrolling
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether a scroll animation is currently in progress
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
      Whether manual page scroll is currently blocked
    </td>
  </tr>
</tbody>
</table>

## Methods

<table>
<thead>
  <tr>
    <th>
      Method
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
        scrollTo(element)
      </code>
    </td>
    
    <td>
      Scroll to bring an element into view. Resolves when animation finishes.
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
// Scroll to a specific element
await instance.scroll.scrollTo(document.getElementById('target'));

// Check if scrolling
if (instance.scroll.isScrolling) {
  console.log('Scroll animation in progress');
}
```

When `scroll: false` is set in config, `scrollTo` becomes a no-op that resolves immediately.

When `animation.isEnabled` is `false` globally, scroll still runs but becomes an instant jump regardless of the configured `duration`.

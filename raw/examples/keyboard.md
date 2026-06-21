# Keyboard

> Enable or disable keyboard navigation — ArrowRight, ArrowLeft, Escape.

Keyboard control is enabled by default. Disable it for tours where keyboard input might interfere with the page.

## Keys

<table>
<thead>
  <tr>
    <th>
      Key
    </th>
    
    <th>
      Action
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ArrowRight
      </code>
    </td>
    
    <td>
      Next step
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ArrowLeft
      </code>
    </td>
    
    <td>
      Previous step
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Escape
      </code>
    </td>
    
    <td>
      Close the tour
    </td>
  </tr>
</tbody>
</table>

## Enabled (default)

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Use keyboard","description":"Press ArrowRight to continue, ArrowLeft to go back.","placement":"bottom-start"},{"target":"#page-toc","title":"Step 2","description":"Keyboard navigation works across all steps.","placement":"top-center"}],"scroll":{"block":"center","duration":400},"tour":{"hasKeyboardControl":true}}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [...],
  tour: { hasKeyboardControl: true },
});
```

## Disabled

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"No keyboard","description":"Keyboard navigation is disabled for this tour.","placement":"bottom-start"}],"scroll":{"block":"center","duration":400},"tour":{"hasKeyboardControl":false}}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [...],
  tour: { hasKeyboardControl: false },
});
```

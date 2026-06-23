# Keyboard

> Enable or disable keyboard navigation — ArrowRight, ArrowLeft, Escape.

<div id="keyboard-description">

Keyboard control is enabled by default. Disable it for tours where keyboard input might interfere with the page.

</div>

## Keys

<div id="keys-table">
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
</div>

## Enabled (default)

<div id="enabled-demo">
<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Page header","description":"Every page starts with a header — the spotlight draws attention to it.","placement":"bottom-start"},{"target":"#keyboard-description","title":"Description","description":"Keyboard control is enabled by default — no extra configuration needed.","placement":"bottom-start"},{"target":"#keys-table","title":"Key bindings","description":"ArrowRight for next, ArrowLeft for previous, Escape to close the tour.","placement":"middle-end"},{"target":"#enabled-default","title":"Enabled section","description":"hasKeyboardControl is set to true — arrow keys and Escape navigate the tour.","placement":"top-start"},{"target":"#enabled-code","title":"Code","description":{"The code shows the config with hasKeyboardControl":"true.","placement":"top-end"}}],"scroll":{"block":"center","duration":400},"tour":{"hasKeyboardControl":true}}">



</borda-component>
</borda-container>

<div id="enabled-code">

```ts
await borda.mount({
  steps: [...],
  tour: { hasKeyboardControl: true },
});
```

</div>

## Disabled

<div id="disabled-demo">
<borda-container>
<borda-component :config="{"steps":[{"target":"#disabled","title":"Disabled section","description":"hasKeyboardControl is set to false — arrow keys and Escape are ignored.","placement":"bottom-start"},{"target":"#disabled-code","title":"Code","description":{"The code shows the config with hasKeyboardControl":"false.","placement":"top-end"}}],"scroll":{"block":"center","duration":400},"tour":{"hasKeyboardControl":false}}">



</borda-component>
</borda-container>
</div>
</div>

<div id="disabled-code">

```ts
await borda.mount({
  steps: [...],
  tour: { hasKeyboardControl: false },
});
```

</div>

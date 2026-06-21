# Skip

> Don't show again

Tour skip renders a "Don't show again" checkbox inside the tooltip. When checked, the tour won't replay for returning users. The state is persisted in `localStorage` under a configurable key. Pass `false` to disable.

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
        checked
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
      Initial checked state
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        label
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      <code>
        Don't show again
      </code>
    </td>
    
    <td>
      Checkbox label text
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        disabled
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
      Whether the checkbox is disabled
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        aria
      </code>
    </td>
    
    <td>
      <code>
        Partial<ComponentAriaProps>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      ARIA attributes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customClasses
      </code>
    </td>
    
    <td>
      <code>
        Partial<BordaTourSkipComponentClasses>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom CSS classes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customStyles
      </code>
    </td>
    
    <td>
      <code>
        Partial<BordaTourSkipComponentStyles>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom inline styles
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customHtml
      </code>
    </td>
    
    <td>
      <code>
        Partial<BordaTourSkipComponentHtml>
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Custom HTML for input/label
    </td>
  </tr>
</tbody>
</table>

```ts
await borda.mount({
  steps: [...],
  tourSkip: {
    label: 'Do not show this again',
  },
});
```

## Disabling

```ts
await borda.mount({
  steps: [...],
  tourSkip: false,
});
```

## Customization

```ts
tourSkip: {
  customClasses: {
    root: 'my-skip-wrapper',
    label: 'text-xs text-gray-400',
  },
}
```

## Interface

```ts
interface BordaTourSkipProps {
  checked: boolean;
  label: string;
  disabled: boolean;
  aria: Partial<ComponentAriaProps>;
  customClasses: Partial<BordaTourSkipComponentClasses>;
  customStyles: Partial<BordaTourSkipComponentStyles>;
  customHtml: Partial<BordaTourSkipComponentHtml>;
}
```

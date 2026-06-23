# Skip

> Configure the "Don't show again" feature with persistent localStorage storage.

<div id="skip-description">

The skip feature adds a "Don't show again" checkbox to the tooltip. When checked, the onboarding won't replay for returning users — the state is persisted in `localStorage`.

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
        storageKey
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      <code>
        borda-skip
      </code>
    </td>
    
    <td>
      Key used in localStorage to persist the skip flag
    </td>
  </tr>
</tbody>
</table>

<borda-container>
<borda-component :config="{"steps":[{"target":"#skip-description","title":"Don't show again","description":"The skip feature adds a checkbox to the tooltip. When checked, the onboarding won't replay.","placement":"bottom-start"},{"target":"#config","title":"Config","description":"The only config option is storageKey — the key used in localStorage to persist the skip flag.","placement":"middle-end"},{"target":"#disabling-skip","title":"Disabling skip","description":"Pass false to remove the skip checkbox entirely.","placement":"top-end"}],"skip":{"storageKey":"docs-demo-skip"}}">



</borda-component>
</borda-container>

```ts
await borda.mount({
  steps: [
    {
      target: '#welcome',
      title: 'Welcome',
      description: 'This onboarding will help you get started.',
      placement: 'bottom-center',
    },
    {
      target: '#dashboard',
      title: 'Your dashboard',
      description: 'Everything you need is right here.',
      placement: 'middle-end',
    },
  ],
  skip: {
    storageKey: 'my-app-onboarding-skip',
  },
});
```

## Disabling skip

Pass `false` to remove the skip checkbox entirely:

```ts
await borda.mount({
  steps: [...],
  skip: false,
});
```

## Runtime API

Control the skip state programmatically:

```ts
// Check if the user chose to skip
instance.skip.isSkipped;

// Set the skip flag manually
instance.skip.set(true);

// Clear the persisted flag (onboarding will replay next time)
instance.skip.clear();

// Read the active storage key
instance.skip.storageKey;
```

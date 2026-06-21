# Container

> The root wrapper that hosts the tour widget.

Container is the root wrapper that hosts all tour components. It provides the outermost DOM element for positioning and styling.

<borda-container>
<borda-component :config="{"steps":[{"target":"#page-header","title":"Container","description":"The container wraps all tour components.","placement":"bottom-start"},{"target":"#page-toc","title":"Code example","description":"Configure the container with custom classes and styles.","placement":"top-center"}]}">



</borda-component>
</borda-container>

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
        customClasses
      </code>
    </td>
    
    <td>
      <code>
        Partial<BordaContainerCustomClasses>
      </code>
    </td>
    
    <td>
      Custom CSS classes for the container
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
        Partial<BordaContainerCustomStyles>
      </code>
    </td>
    
    <td>
      Custom inline styles for the container
    </td>
  </tr>
</tbody>
</table>

## Customization

The container accepts `root` as the target key:

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
  container: {
    customClasses: {
      root: 'my-tour-container',
    },
    customStyles: {
      root: {
        zIndex: '9999',
      },
    },
  },
});
```

## Interface

```ts
interface BordaContainerProps {
  customClasses: Partial<BordaContainerCustomClasses>;
  customStyles: Partial<BordaContainerCustomStyles>;
}
```

# Controller API

> Tour navigation API — currentStep, next, prev, changeStep, finish, and move prevention.

The controller manages the active tour step state. It provides navigation methods, step info, and a move-prevention mechanism for async workflows.

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
        isActivated
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
      
       when the tour has at least one step
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        currentStep
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      Current 1-based step number
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        currentStepIndex
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      Current 0-based index
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        totalSteps
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      Total number of steps
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        hasNextStep
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
      
       when there is a step after the current one
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        hasPrevStep
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
      
       when there is a step before the current one
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        currentTarget
      </code>
    </td>
    
    <td>
      <code>
        HTMLElement | null
      </code>
    </td>
    
    <td>
      Resolved DOM element for the current step's target
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        step
      </code>
    </td>
    
    <td>
      <code>
        BordaStepConfig | undefined
      </code>
    </td>
    
    <td>
      Full data object of the current step, including per-step overrides
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isMovePrevented
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
      
       while navigation is paused via <code>
        preventMove()
      </code>
    </td>
  </tr>
</tbody>
</table>

## Methods

### next()

Navigate to the next step. On the last step, calls `finish()` instead:

```ts
await instance.api.controller.next();
```

### prev()

Navigate to the previous step:

```ts
await instance.api.controller.prev();
```

### changeStep(index)

Jump to a specific step by 0-based index. Waits for `prepareElement` if defined:

```ts
await instance.api.controller.changeStep(2); // jump to step 3
```

### finish()

Emit `ON_TOUR_FINISH` and end the tour:

```ts
instance.api.controller.finish();
```

### preventMove()

Pause the in-progress navigation. Useful for async workflows where you need to fetch data or animate something before the step changes:

```ts
instance.api.events.on(BordaEvent.ON_TOUR_STEP_CHANGE, async () => {
  instance.api.controller.preventMove();
  await loadData();
  instance.api.controller.continue();
});
```

### continue()

Resume a navigation paused by `preventMove()`:

```ts
instance.api.controller.continue();
```

### clearMovePrevented()

Cancel a paused navigation without completing it:

```ts
instance.api.controller.clearMovePrevented();
```

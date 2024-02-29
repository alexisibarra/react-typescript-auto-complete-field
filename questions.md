# Questions

1. **What is the difference between Component and PureComponent?**

Directly from [React's docs](https://react.dev/reference/react/PureComponent):

> PureComponent is similar to Component but it skips re-renders for same props and state.

> PureComponent is a subclass of Component and supports all the Component APIs. Extending PureComponent is equivalent to defining a custom shouldComponentUpdate method that shallowly compares props and state.

2. **Context + ShouldComponentUpdate might be dangerous. Why is that?**

Using shouldComponentUpdate with context can be risky because context updates may trigger unnecessary re-renders even if the specific component's own props or state haven't changed. If the component relies solely on its own props and state, it might not be necessary to implement shouldComponentUpdate with context usage.

3. **Describe 3 ways to pass information from a component to its PARENT.**

- Using context, redux or any state manager: this method would allow to have one or more sources of information which can be available for the parent
- Callbacks in props: the parent could implement a callback that is called by the child whenever some new data needs to climb up the hierarchy ladder.

4. **Give 2 ways to prevent components from re-rendering.**

- Avoid the use of unnecessary useEffects
- Use React.memo HOC to wrap the component

5. **What is a fragment and why do we need it? Give an example where it might break my app.**

From [React's docs](https://react.dev/reference/react/Fragment): <Fragment>, often used via <>...</> syntax, lets you group elements without a wrapper node.

6. **Give 3 examples of the HOC pattern.**

- ChakraProvider:

```
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

const withTheme = (WrappedComponent, themeName) => {
  const theme = themeName === 'light' ? lightTheme : darkTheme;
  return (props) => <ChakraProvider theme={theme}><WrappedComponent {...props} /></ChakraProvider>;
};
```

- Redux' connect:

```
import { login, logout } from './actionCreators'

const mapState = (state) => state.user
const mapDispatch = { login, logout }

// first call: returns a hoc that you can use to wrap any component
const connectUser = connect(mapState, mapDispatch)

// second call: returns the wrapper component with mergedProps
// you may use the hoc to enable different components to get the same behavior
const ConnectedUserLogin = connectUser(Login)
const ConnectedUserProfile = connectUser(Profile)
```

- Form Validation:

```
import React from 'react';
import { useForm } from 'react-hook-form';

const withFormValidation = (WrappedComponent) => {
  return (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <WrappedComponent register={register} errors={errors} {...props} />
        <button type="submit">Submit</button>
      </form>
    );
  };
};
```

7. **What's the difference in handling exceptions in promises, callbacks and async...await?**

To handle an exception on a promise chain, we'd add a .catch() method where we'd get the error
and do anything with it.

To handle a callbacks failure, we set the function inside a wrap the callback function in a try/catch block

With Async/await we wrap the async code with a try/catch block

8. **How many arguments does setState take and why is it async.**

Directly from [React's Documentation](https://react.dev/reference/react/Component#setstate):

> setState(nextState, callback?)
> Call setState to update the state of your React component.

> Parameters
>
> - nextState: Either an object or a function.
>   - If you pass an object as nextState, it will be shallowly merged into this.state.
>   - If you pass a function as nextState, it will be treated as an updater function. It must be pure, should take the pending state and props as arguments, and should return the object to be shallowly merged into this.state. React will put your updater function in a queue and re-render your component. During the next render, React will calculate the next state by applying all of the queued updaters to the previous state.
> - optional callback: If specified, React will call the callback you’ve provided after the update is committed.

SetState updates the state asynchronously to avoid interfering with the rendering process. The callback allows you to perform actions after the state is guaranteed to be updated.

9. **List the steps needed to migrate a Class to Function Component.**

- Change the signature of the component from class to function
- Refactor the state logic using hooks
- Remove the constructor (if present) and refactor it's logic using state hooks, useEffects and auxiliary functions within the component if needed
- Remove the render method and just return the jsx that was inside it
- Move event handlers and any other logic from the class methods to the functional component body.
- Remove any reference to `this` and use the functions and methods declared inside the component

10. **List a few ways styles can be used with components.**

- Inline styles: style attribute directly within JSX elements.
- CSS files imported on the component's file: this way the CSS can be writen on a separate file and referenced by the component with classes and ids as we normally do
- Styled components: leverage the power of javascript to create dynamic styling

11. **How to render an HTML string coming from the server.**
    The dangerouslySetInnerHTML prop allows you to inject HTML content directly into the DOM.

This was what I used to highlight the matching pattern in the field's dropdown

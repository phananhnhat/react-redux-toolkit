// Cho phép dispatch 1 action là 1 funtion thay vì là 1 plain Object như thông thường

/** A function that accepts a potential "extra argument" value to be injected later,
 * and returns an instance of the thunk middleware that uses that value
 */
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    next =>
      action => {
        // The thunk middleware looks for any functions that were passed to `store.dispatch`.
        // If this "action" is really a function, call it and return the result.
        if (typeof action === 'function') {
          // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
          return action(dispatch, getState, extraArgument)
        }

        // Otherwise, pass the action down the middleware chain as usual
        return next(action)
  }
}

const reduxThunk = createThunkMiddleware();

// Attach the factory function so users can create a customized version
// with whatever "extra arg" they want to inject into their thunks
reduxThunk.withExtraArgument = createThunkMiddleware

export default reduxThunk
export default ({getState, dispatch}) => {
  return next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // next(returnValue);

    console.log('lol', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  }
}

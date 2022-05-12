const initialState = {
  value: 0,
  status: 'default',
}

export default function countReducer(state = initialState, action) {
  // console.log(action)
  switch (action.type) {
    case 'tang1': {
      return {
        ...state,
        value: state.value + 1,
      }
    }
    case 'giam1': {
      return {
        ...state,
        value: state.value - 1,
      }
    }
    default:
      return state
  }
}

const initialState = {
  noOfEvents: 10,
  filter: ''
}
export const eventFilter = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_FILTER':
      return state;
    case 'UPDATE_FILTER':
      return Object.assign({}, state, { filter: action.filter})
    case 'SHOW_MORE_EVENTS':
      return Object.assign({}, state, { noOfEvents: state.noOfEvents+5});
  }
  return state;
}
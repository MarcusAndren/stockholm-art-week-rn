const initialState = {
  noOfEvents: 10,
  filter: '',
  days: [
    {label: 'Monday', value: 1},
    {label: 'Tuesday', value: 2},
    {label: 'Wednesday', value: 3},
    {label: 'Thursday', value: 4},
    {label: 'Friday', value: 5},
    {label: 'Saturday', value: 6},
    {label: 'Sunday', value: 0},
    {label: 'All events', value: -1}
  ],
  day: null
}
export const eventFilter = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_FILTER':
      return state;
    case 'UPDATE_FILTER':
      return Object.assign({}, state, { filter: action.filter})
    case 'SHOW_MORE_EVENTS':
      return Object.assign({}, state, { noOfEvents: state.noOfEvents+5});
    case 'SELECT_DAY':
      return Object.assign({}, state, { day: action.day});
  }
  return state;
}
const initalState = {
  events: [],
  filteredEvents:[], 
  isLoading: false,
  error: null
}

export const events = (state = initalState, action) => {
  switch(action.type) {
    case 'GET_EVENTS':
      return state;
    case 'GET_EVENTS_START':
      return Object.assign({}, state, { error: null, isLoading: true});
    case 'GET_EVENTS_SUCCESS':
      return Object.assign({}, state, { events: action.payload, filteredEvents: action.payload, isLoading: false});
    case 'GET_EVENTS_FAILURE':
      return Object.assign({}, state, { error: action.payload, isLoading: false});
    case 'SET_FILTERED_EVENTS':
      return Object.assign({}, state, { filteredEvents: action.payload });
    default:
      return state;
  }
}

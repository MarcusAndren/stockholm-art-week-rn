import { EventsApi } from 'saw/src/apis';

const eventsApi = new EventsApi();

export const getEvents = (x) => {
  return (dispatch, getState) => {
    const state = getState();

    if(state.events.events.length && !state.events.error && !state.events.isLoading) {
      dispatch({type: 'GET_EVENTS'});
      return;
    }

    dispatch({type: 'GET_EVENTS_START'});

    eventsApi.getEvents()
      .then((response) => {
        dispatch({type: 'GET_EVENTS_SUCCESS', payload: response});
      }).catch((error) => {
        dispatch({type: 'GET_EVENTS_FAILURE', payload: error});
      });
  }
};

export const setFilteredEvents = (events) => {
  return {type: 'SET_FILTERED_EVENTS', payload: events};
}

export const updateFilter = (filter) => {
  return {type: 'UPDATE_FILTER', filter: filter};
};

export const showMoreEvents = () => {
  return {type: 'SHOW_MORE_EVENTS'};
};
import { combineReducers } from 'redux';

import { events } from './events';
import { eventFilter } from './eventFilter';

export default combineReducers({
  events,
  eventFilter
})
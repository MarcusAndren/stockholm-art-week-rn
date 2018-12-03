
import { createStackNavigator } from 'react-navigation';

import EventScreen from 'saw/src/containers/Event/Event';
import EventsScreen from 'saw/src/containers/Events/Events';

const CalendarStack = createStackNavigator(
  {
    Events: EventsScreen,
    Event: EventScreen
  },
  {
    initialRouteName: 'Events',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default CalendarStack;
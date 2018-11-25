
import { createStackNavigator } from 'react-navigation';

import HomeScreen from 'saw/src/containers/Home';
import CalendarScreen from 'saw/src/containers/Calendar';
import MapScreen from 'saw/src/containers/Map';
import EventScreen from 'saw/src/containers/Event/Event';

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Calendar: CalendarScreen,
    Map: MapScreen,
    Event: EventScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

export default MainStack;
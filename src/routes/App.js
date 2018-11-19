
import { createStackNavigator } from 'react-navigation';

import MainScreen from 'saw/src/containers/Main';

const AppStack = createStackNavigator(
  {
    Main: MainScreen
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

export default AppStack;
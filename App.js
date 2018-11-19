import React from 'react';
import { createAppContainer } from 'react-navigation';
import { View } from 'react-native';

import AppStack from 'saw/src/routes/App';

const AppContainer = createAppContainer(AppStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}
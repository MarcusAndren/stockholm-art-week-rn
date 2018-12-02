import React from 'react';
import { createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import AppStack from 'saw/src/routes/App';
import store from 'saw/src/redux/store';

const AppContainer = createAppContainer(AppStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
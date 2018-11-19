import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import styled from 'styled-components';

import MainStack from 'saw/src/routes/Main';
import TopNavigation from 'saw/src/components/TopNavigation';

const StyledView = styled.View`
  flex: 1;
`;

export default class MainScreen extends React.Component {
  static router = MainStack.router;

  render() {
    const navigation = this.props.navigation;

    return (
      <StyledView>
        <TopNavigation navigation={navigation}></TopNavigation>
        <MainStack navigation={navigation} />
      </StyledView>
    )
  }
}
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import TopLink from 'saw/src/components/TopNavigation/TopLink';

const StyledView = styled.View`
  position: absolute;
  z-index: 1000;
  top: 50px;
  left: 30px;
  flex: 1;
  flex-direction: row;
`;

export default class TopNavigation extends React.Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <StyledView>
        <TopLink title="#SAW" route="Home" navigation={navigation}></TopLink>
        <TopLink title="CALENDAR(18)" route="Calendar" navigation={navigation}></TopLink>
        <TopLink title="MAP" route="Map" navigation={navigation}></TopLink>
      </StyledView>
    );
  }
}

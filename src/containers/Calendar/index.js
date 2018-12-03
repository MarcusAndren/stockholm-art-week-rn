import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import CalendarStack from 'saw/src/routes/Calendar';

const StyledView = styled.View`
  flex: 1;
`;

export default class CalendarScreen extends React.Component {
  static router = CalendarStack.router;

  render() {
    const navigation = this.props.navigation;

    return (
      <StyledView>
        <CalendarStack navigation={navigation} />
      </StyledView>
    )
  }
}
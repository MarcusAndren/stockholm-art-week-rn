import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const StyledView = styled.View`
  background-color: #FFF;
  flex: 1;
  padding: 200px 20px 0;
`;

export default class MapScreen extends React.Component {
  render() {
    return (
      <StyledView>
        <Text>Map</Text>
      </StyledView>
    );
  }
}

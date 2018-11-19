import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

const StyledView = styled.View`
  background-color: #000;
  padding: 10px;
  margin: 0 15px 0 0;
`;

const StyledText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export default class TopLink extends React.Component {
  render() {
    return (
      <StyledView>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.route)}>
          <StyledText>{this.props.title}</StyledText>
        </TouchableOpacity>
      </StyledView>
    );
  }
}

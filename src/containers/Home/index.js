import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components';

const StyledView = styled.View`
  background-color: #FF2D4A;
  flex: 1;
  padding: 200px 20px 0;
`;

const StyledImage = styled.Image`
  width: 284px;
  height: 267px;
`;

export default class HomeScreen extends React.Component {
  render() {
    return (
      <StyledView>
        <StyledImage source={require('saw/assets/logo.png')}></StyledImage>
      </StyledView>
    );
  }
}

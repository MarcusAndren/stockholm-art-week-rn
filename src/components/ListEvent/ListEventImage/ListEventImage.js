import React from 'react';
import { View,ActivityIndicator, Dimensions } from 'react-native';
import styled from 'styled-components';
import FitImage from 'react-native-fit-image';

const StyledView = styled.View`
  flex: 1;
  background-color: #fcfcfc;
  justify-content: center;
`;

const LoadingView = styled.View`
  border: 1px solid #ddd;
  justify-content: center;
  width: 100%;
  height: 125px;
`;

export default class ListEventImage extends React.Component {
  render() {
    return (
      <StyledView>
        <FitImage resizeMode="contain" style={{height: 200, width: (Dimensions.get('window').width / 2) - 30}} source={{uri: this.props.eventImage}}></FitImage>
      </StyledView>
    );
  }
}

import React from 'react';
import { View,ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import FlexImage from 'react-native-flex-image';

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
        <FlexImage
          source={{uri: this.props.eventImage}}
          loadingComponent={
            <LoadingView>
              <ActivityIndicator size="small" color="#cccccc" />
            </LoadingView>
          }></FlexImage>
      </StyledView>
    );
  }
}

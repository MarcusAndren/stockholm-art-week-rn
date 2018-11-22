import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import FlexImage from 'react-native-flex-image';

const StyledView = styled.View`
  flex: 1;
  background-color: #CCC;
  min-height: 100px;
`;

export default class ListEventImage extends React.Component {
  render() {
    return (
      <StyledView>
        <FlexImage source={{uri: this.props.eventImage}}></FlexImage>
      </StyledView>
    );
  }
}

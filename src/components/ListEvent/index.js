import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import AutoHeightImage from 'react-native-auto-height-image';


const StyledView = styled.View`
  background-color: #000;
  flex: 0.5;
  margin: 10px;
  height: 200px;
`;

export default class ListEvent extends React.Component {
  render() {
    console.log(this.props.event.eventImages);
    return (
      <StyledView>
        <AutoHeightImage height={100} source={{uri: this.props.event.eventImages[0].imageSrc}}></AutoHeightImage>
      </StyledView>
    );
  }
}

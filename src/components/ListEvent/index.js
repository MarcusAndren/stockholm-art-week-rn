import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import FlexImage from 'react-native-flex-image';

import ListEventImage from 'saw/src/components/ListEvent/ListEventImage/ListEventImage';
import ListEventDescription from 'saw/src/components/ListEvent/ListEventDescription/ListEventDescription';

const StyledView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;


export default class ListEvent extends React.Component {
  render() {
    return (
      <StyledView>
        <ListEventImage eventImage={this.props.event.eventImages[0].imageSrc}></ListEventImage>
        <ListEventDescription event={this.props.event}></ListEventDescription>
      </StyledView>
    );
  }
}

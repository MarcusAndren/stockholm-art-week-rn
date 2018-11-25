import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';

import ListEventImage from 'saw/src/components/ListEvent/ListEventImage/ListEventImage';
import ListEventDescription from 'saw/src/components/ListEvent/ListEventDescription/ListEventDescription';

const EventWrapper = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Filter = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export default class ListEvent extends React.Component {
  render() {
    return (
      <EventWrapper onPress={() => this.props.navigation.navigate('Event', this.props.event)} >
        <ListEventImage eventImage={this.props.event.eventImages[0].imageSrc}></ListEventImage>
        <ListEventDescription event={this.props.event}></ListEventDescription>
      </EventWrapper>
    );
  }
}

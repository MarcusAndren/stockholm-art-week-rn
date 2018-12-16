import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';

import ListEventImage from 'saw/src/components/ListEvent/ListEventImage/ListEventImage';
import ListEventDescription from 'saw/src/components/ListEvent/ListEventDescription/ListEventDescription';

const EventWrapper = styled.TouchableOpacity`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  padding: 15px;
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

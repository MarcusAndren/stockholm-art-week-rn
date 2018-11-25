import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';

import { formatDate } from 'saw/src/util/date';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  max-height: 200px;
`;

const TextWrapper = styled.View`
  padding: 0 10px;
`;

const Header = styled.Text`
  text-align: center;
  font-weight: bold;
  padding: 0 0 15px;
`;

const Venue = styled.Text`
  padding: 2px 0 0;
  font-size: 12px;
  text-align: center;
  font-weight: 700;
`;

const Address = styled.Text`
  padding: 2px 0 0;
  font-size: 12px;
  text-align: center;
  color: #111;
`;

const DateText = styled.Text`
  padding: 8px 0 0;
  text-align: center;
  font-size: 12px;
`;

export default class ListEvent extends React.Component {
  render() {
    return (
      <Wrapper>
        <TextWrapper>
          <Header>{this.props.event.title}</Header>
        </TextWrapper>
        <TextWrapper>
          <Venue>{this.props.event.venue}</Venue>
          <Address>{this.props.event.address}</Address>
          <DateText>{formatDate(this.props.event.startDate, this.props.event.endDate)}</DateText>
        </TextWrapper>
      </Wrapper>
    );
  }
}

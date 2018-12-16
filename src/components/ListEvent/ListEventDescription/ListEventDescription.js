import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';

import { formatDate } from 'saw/src/util/date';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  max-height: 200px;
  margin: 15px 0 0;
  width: 100%;
`;

const TextWrapper = styled.View`
`;

const Header = styled.Text`
  font-size: 14px
  font-weight: bold;
  padding: 0 0 10px;
`;

const Venue = styled.Text`
  padding: 2px 0 0;
  font-size: 14px;
  font-weight: 700;
`;

const Address = styled.Text`
  padding: 2px 0 0;
  font-size: 14px;
  color: #111;
`;

const DateText = styled.Text`
  padding: 10px 0 0;
  font-size: 14px;
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

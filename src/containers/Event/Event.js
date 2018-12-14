import React from 'react';
import { View, Text, Linking, Dimensions } from 'react-native';
import styled from 'styled-components';
import FitImage from 'react-native-fit-image';

import { formatDate } from 'saw/src/util/date';

const EventWrapper = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  margin: 150px 0 0;
  padding: 0 10px 100px;
`;

const ImageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 0 15px;
`;

const Back = styled.Text`
  font-size: 16px;
  padding: 0 0 20px;
  color: #768db0;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding: 0 0 15px;
`;

const Description = styled.Text`
  font-size: 16px;
  padding: 0 0 15px;
`;

const Detail = styled.Text`
  font-size: 16px;
  padding: 0 0 15px;
`;

const Link = styled.Text`
  font-size: 16px;
  padding: 0 0 50px;
`;

export default class EventScreen extends React.Component {

  openLink(url) {
    if(!url) {
      return;
    }
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

  render() {
    const event = this.props.navigation.state.params;

    return (
      <EventWrapper>
        <View><Back onPress={() => this.props.navigation.goBack(null)}>Back</Back></View>
        <ImageWrapper>
          <FitImage resizeMode="contain" style={{height: 300, width: Dimensions.get('window').width}} source={{uri: event.eventImages[0].imageSrc}}></FitImage>
        </ImageWrapper>
        <Title>{event.title}</Title>
        <Description>{event.description}</Description>
        <Title><Text>Details</Text></Title>
        <Detail>{formatDate(event.startDate, event.endDate)}</Detail>
        <Detail>{event.venue}</Detail>
        <Detail>{event.address}</Detail>
        { event.website ? (<Link onPress={this.openLink(event.website)}>{event.website}</Link>) : null }
        { event.facebook ? (<Link onPress={this.openLink(event.facebook)}>{event.facebook}</Link>) : null }
      </EventWrapper>
    );
  }
}

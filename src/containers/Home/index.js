import React from 'react';
import { View, Image, ScrollView, Dimensions, Text, Linking } from 'react-native';
import styled from 'styled-components';
import FitImage from 'react-native-fit-image';

const MainWrapper = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.View`
  background-color: #FF2D4A;
  display: flex;
  padding: 0 10px 0;
`;

const AboutWrapper = styled.View`
  background-color: #FFF;
  display: flex;
`;

const Header = styled.Text`
  font-weight: bold;
  padding: 50px 10px 0;
  font-size: 24px;
`;

const Information = styled.Text`
  padding: 20px 10px 0;
`;

const LinkWrapper = styled.View`
  padding: 20px 0 50px;
  display: flex;
  flex-direction: row;
`;

const Link = styled.Text`
  font-size: 20px;
  text-decoration-line: underline;
  padding: 0 0 0 10px;
`;

export default class HomeScreen extends React.Component {

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
    return (
      <MainWrapper>
        <ImageWrapper style={{height: Dimensions.get('window').height}}>
          <FitImage resizeMode="contain" style={{borderRadius: 10}} source={require('saw/assets/logo.png')}></FitImage>
        </ImageWrapper>

        <AboutWrapper>
          <Header>About</Header>
          <Information>
            Stockholm Art Week is a platform that showcases leading Nordic art fairs alongside many of Stockholm’s prominent museums,
            institutions and art spaces who will arrange special programs, events and pop-up exhibitions throughout the duration of the week.
            The annual celebration of Stockholm’s vibrant art scene aims to promote the visual arts to a wider audience and showcase Sweden as a global art destination.
          </Information>
          <Header>Get in touch</Header>
          <Information>
            If you represent an institution, museum, art space,
            gallery or any art related space and would like to participate or contribute to Stockholm Art Week,
            please contact us at info@stockholmartweek.com.
          </Information>
          <Information>Press - stina@stockholmartweek.com</Information>
          <Information>Director - joanna@stockholmartweek.com</Information>
          <Header>Social</Header>
          <LinkWrapper>
            <Link onPress={() => this.openLink('https://www.facebook.com/StockholmArtWeek/')}>Facebook</Link>
            <Link onPress={() => this.openLink('https://www.instagram.com/stockholmartweek/')}>Instagram</Link>
            <Link onPress={() => this.openLink('https://twitter.com/sthlmartweek')}>Twitter</Link>
          </LinkWrapper>
        </AboutWrapper>

      </MainWrapper>
    );
  }
}

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { MapView } from 'expo';

const StyledView = styled.View`
  background-color: #FFF;
  flex: 1;
  padding: 200px 20px 0;
`;

export default class MapScreen extends React.Component {
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 59.334591,
          longitude: 18.063240,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

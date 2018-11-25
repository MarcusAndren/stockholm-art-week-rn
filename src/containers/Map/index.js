import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { MapView } from 'expo';

import { EventsApi } from 'saw/src/apis';
import { formatDate } from 'saw/src/util/date';

const StyledView = styled.View`
  background-color: #FFF;
  flex: 1;
  padding: 200px 20px 0;
`;

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.mapRef = null;
    }

  componentDidMount() {
    const eventsApi = new EventsApi();

    eventsApi.getEvents().then((response) => {
      this.setState({
        events: response
      });

      const eventIds = response.filter((event) => event.lat && event.lng).map((event) => (event.id+''));
      console.log(eventIds);
      this.mapRef.fitToSuppliedMarkers(
        eventIds,
        {
          animated: true
        }
      );
    });
  }

  render() {
    let events = this.state.events || [];

    return (
      <MapView
        ref={(ref) => { this.mapRef = ref }}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 59.334591,
          longitude: 18.063240,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {
          events
            .filter((event) => event.lat && event.lng)
            .map((event) => (
              <MapView.Marker
                identifier={event.id+''}
                key={event.id}
                coordinate={{
                  latitude: parseFloat(event.lat, 10),
                  longitude: parseFloat(event.lng, 10)
                }}
                title={event.title}
                description={event.description}
              >
                <MapView.Callout>
                  <Text>{event.title}</Text>
                  <Text>{event.venue}</Text>
                  <Text>{event.address}</Text>
                  <Text>{formatDate(event.startDate, event.endDate)}</Text>
                </MapView.Callout>
              </MapView.Marker>
            ))
        }
      </MapView>
    );
  }
}

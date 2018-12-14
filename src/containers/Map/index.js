import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { MapView } from 'expo';
import { connect } from 'react-redux';

import { EventsApi } from 'saw/src/apis';
import { formatDate } from 'saw/src/util/date';
import { getEvents } from 'saw/src/redux/actions';

const StyledView = styled.View`
  background-color: #FFF;
  flex: 1;
  padding: 200px 20px 0;
`;

const Link = styled.Text`
  color: #768db0;
  z-index: 9999;
`;

const mapStateToProps = (state) => ({
  events: state.events
});

const mapDispatchToProps = (dispatch) => ({
  getEvents: () => dispatch(getEvents())
});

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.mapRef = null;
  }

  componentDidMount() {
    this.props.getEvents();

    setTimeout(() => {
      this.fitMap();
    }, 1000);
  }

  componentDidUpdate() {
    this.fitMap();
  }

  fitMap() {
    if(this.props.events.isLoading || this.props.events.events.length === 0) {
      return;
    }

    const eventIds = this.props.events.events
      .filter((event) => event.lat && event.lng)
      .map((event) => (event.id+''));

    this.mapRef.fitToSuppliedMarkers(
      eventIds,
      {
        animated: true
      }
    );
  }

  render() {
    let events = this.props.events.events || [];

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
                onCalloutPress={() => this.props.navigation.navigate('Event', event)}

              >
                <MapView.Callout>
                  <Text>{event.title}</Text>
                  <Text>{event.venue}</Text>
                  <Text>{event.address}</Text>
                  <Text>{formatDate(event.startDate, event.endDate)}</Text>
                  <Link>More information</Link>
                </MapView.Callout>
              </MapView.Marker>
            ))
        }
      </MapView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
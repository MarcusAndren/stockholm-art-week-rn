import React from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components';

import ListEvent from 'saw/src/components/ListEvent';
import { EventsApi } from 'saw/src/apis';

const StyledScrollView = styled.ScrollView`
  background-color: #FFF;
  padding: 150px 0 0;
  display: flex;
`;

export default class CalendarScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    const eventsApi = new EventsApi();

    eventsApi.getEvents().then((response) => {
      this.setState({
        isLoading: false,
        events: response,
        noOfEvents: 10
      });
    });
  }

  render() {
    const onScroll = (event) => {
      const paddingToBottom = 50;
      const bottom = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - paddingToBottom;
      if (bottom) {
        const noOfEvents = this.state.noOfEvents+5;
        this.setState({noOfEvents: noOfEvents});
      }
    }

    if(this.state.isLoading) {
      return (
        <StyledScrollView>
          <Text>Calendar</Text>
        </StyledScrollView>
      ); 
    }

    return (
      <StyledScrollView
        onScroll={onScroll}
        scrollEventThrottle={400}>
        {
          this.state.events
            .filter((event, index) => {
              return index < this.state.noOfEvents;
            })
            .map((event) => {
              return <ListEvent key={event.id} event={event}></ListEvent>;
            })
        }
      </StyledScrollView>
    );
  }
}

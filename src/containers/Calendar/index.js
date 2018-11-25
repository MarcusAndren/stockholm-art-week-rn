import React from 'react';
import { ScrollView, View, Text, Picker } from 'react-native';
import styled from 'styled-components';

import ListEvent from 'saw/src/components/ListEvent';
import { EventsApi } from 'saw/src/apis';

const LoadingView = styled.View`
  background-color: #FFF;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const MainScrollView = styled.ScrollView`
  background-color: #FFF;
  padding: 150px 0 0;
  display: flex;
  flex-direction: column;
`;

const Filter = styled.View`
  display: flex;
  flex-direction: row;
  margin: 0 0 40px;
`;

const FilterInput = styled.TextInput`
  border-color: #000;
  border-width: 1px;
  font-size: 16px;
  flex: 0.75;
  height: 40px;
  padding: 0 10px;
  margin: 0 5px 0 10px;
`;

const FilterPicker = styled.View`
  flex: 0.25;
  border-color: #000;
  border-width: 1px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin: 0 10px 0 5px;
`;

export default class CalendarScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      items: [
        {label: "Today", value: 1},
        {label: "Tomorrow", value: 2}
      ],
      text: ''
    }
  }

  componentDidMount(){
    const eventsApi = new EventsApi();

    eventsApi.getEvents().then((response) => {
      response.sort(function(a, b) {
        a = new Date(a.startDate);
        b = new Date(b.startDate);
        return a > b ? 1 : a < b ? -1 : 0;
      });
      
      this.setState({
        isLoading: false,
        events: response,
        filteredEvents: response,
        noOfEvents: 10
      });
    });
  }

  render() {
    const onScroll = (event) => {
      const paddingToBottom = 50;
      const bottom = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - paddingToBottom;
      if (bottom && this.state.filteredEvents.length >= this.state.noOfEvents+5) {
        const noOfEvents = this.state.noOfEvents+5;
        this.setState({noOfEvents: noOfEvents});
      }
    }

    const onFilterUpdate = (text) => {
      text = text.toLowerCase();
      const filteredEvents = this.state.events.filter((event) => {
        return (event.address && event.address.toLowerCase().indexOf(text) >= 0)
          || (event.venue && event.venue.toLowerCase().indexOf(text) >= 0)
          || (event.title && event.title.toLowerCase().indexOf(text) >= 0);
      });

      this.setState({text: text, filteredEvents: filteredEvents});
    }

    if(this.state.isLoading) {
      return (
        <LoadingView>
          <Text>Calendar</Text>
        </LoadingView>
      ); 
    }

    return (
      <MainScrollView
        onScroll={onScroll}
        scrollEventThrottle={400}>
        <Filter>
          <FilterInput
            onChangeText={onFilterUpdate}
            value={this.state.text}
          />
          <FilterPicker>
            <Text>Today</Text>
          </FilterPicker>
        </Filter>
        <View>
        {
          this.state.filteredEvents
            .filter((event, index) => {
              return index < this.state.noOfEvents;
            })
            .map((event) => {
              return <ListEvent key={event.id} event={event}></ListEvent>;
            })
        }
        </View>
      </MainScrollView>
    );
  }
}

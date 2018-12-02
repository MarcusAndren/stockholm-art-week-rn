import React from 'react';
import { ScrollView, View, Text, Picker, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ListEvent from 'saw/src/components/ListEvent';
import { EventsApi } from 'saw/src/apis';
import { getEvents, updateFilter, showMoreEvents, setFilteredEvents } from 'saw/src/redux/actions';

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

const mapStateToProps = (state) => ({
    events: state.events,
    eventFilter: state.eventFilter
});

const mapDispatchToProps = (dispatch) => ({
    getEvents: () => dispatch(getEvents()),
    showMoreEvents: () => dispatch(showMoreEvents()),
    updateFilter: (text) => dispatch(updateFilter(text)),
    setFilteredEvents: (filteredEvents) => dispatch(setFilteredEvents(filteredEvents))
});

class CalendarScreen extends React.Component {
  state = {
    filterText: ''
  }

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const navigation = this.props.navigation;

    const onScroll = (event) => {
      const paddingToBottom = 50;
      const bottom = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - paddingToBottom;
      if (bottom && this.props.events.filteredEvents.length >= this.props.eventFilter.noOfEvents+5) {
        this.props.showMoreEvents();
      }
    }

    const onFilterUpdate = (text) => {
      text = text.toLowerCase();
      const filteredEvents = this.props.events.events.filter((event) => {
        return (event.address && event.address.toLowerCase().indexOf(text) >= 0)
          || (event.venue && event.venue.toLowerCase().indexOf(text) >= 0)
          || (event.title && event.title.toLowerCase().indexOf(text) >= 0);
      });

      this.props.updateFilter(text);
      this.setState({filterText: text});
      //this.props.setFilteredEvents(filteredEvents);
    }

    if(this.props.events.isLoading) {
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
            value={this.state.filterText}
          />
          <FilterPicker>
            <Text>Today</Text>
          </FilterPicker>
        </Filter>
        <View>
        {
          this.props.events.filteredEvents
            .filter((event, index) => {
              return index < this.props.eventFilter.noOfEvents;
            })
            .map((event) => {
              return <ListEvent navigation={navigation} key={event.id} event={event}></ListEvent>;
            })
        }
        </View>
      </MainScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
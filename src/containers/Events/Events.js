import React from 'react';
import { ScrollView, View, Text, Picker, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

import ListEvent from 'saw/src/components/ListEvent';
import { EventsApi } from 'saw/src/apis';
import { weekdayInBetweenDates } from 'saw/src/util/date';
import { getEvents, updateFilter, showMoreEvents, setFilteredEvents, selectDay } from 'saw/src/redux/actions';

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
  border-bottom-color: #000;
  border-bottom-width: 1px;
  font-size: 16px;
  flex: 0.5;
  height: 40px;
  margin: 0 5px 0 10px;
`;

const FilterPicker = styled.View`
  flex: 0.5;
  border-bottom-color: #000;
  border-bottom-width: 1px;
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
  setFilteredEvents: (filteredEvents) => dispatch(setFilteredEvents(filteredEvents)),
  selectDay: (day) => dispatch(selectDay(day))
});

class EventsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      day: ''
    }

    this.pickerRef = null;
  }

  componentDidMount() {
    this.props.getEvents();
    this.setState({filter: this.props.eventFilter.filter});
    console.log(this.props.eventFilter.days);
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
      this.setState({filter: text});
      this.props.updateFilter(text);

      text = (' ' + text).slice(1).toLowerCase();

      const filteredEvents = this.props.events.events.filter((event) => {
        return (event.address && event.address.toLowerCase().indexOf(text) >= 0)
          || (event.venue && event.venue.toLowerCase().indexOf(text) >= 0)
          || (event.title && event.title.toLowerCase().indexOf(text) >= 0);
      });

      this.props.setFilteredEvents(filteredEvents);
    }

    const onSelectDay = (day) => {
      console.log(day);
      this.props.selectDay(day);

      const filteredEvents = this.props.events.events.filter((event) => {
        console.log(event);
        const x = weekdayInBetweenDates(day, event.startDate, event.endDate);
        console.log(x);
        return x;
      });

      this.props.setFilteredEvents(filteredEvents);
    }

    if(this.props.events.isLoading) {
      return (
        <LoadingView>
          <ActivityIndicator size="small" color="black" />
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
            value={this.state.filter}
            placeholder="Search..."
            placeholderTextColor="#000000"
          />
          <FilterPicker>
            <RNPickerSelect
              placeholder={{
                label: 'Filter events by day',
                value: null
              }}
              items={this.props.eventFilter.days}
              onValueChange={onSelectDay}
              value={this.props.eventFilter.day}
              ref={(el) => {
                this.pickerRef = el;
              }}
            /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
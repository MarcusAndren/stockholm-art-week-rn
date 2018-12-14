import React from 'react';
import { ScrollView, View, Text, Picker, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
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
  border-bottom-color: #000;
  border-bottom-width: 1px;
  flex: 0.5;
  height: 40px;
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
  }

  componentDidUpdate(prevProps) {
    if(prevProps.eventFilter.filter !== this.props.eventFilter.filter || prevProps.eventFilter.day !== this.props.eventFilter.day) {
      this.filterEvents();
    }
  }

  filterEvents() {
    const day = this.props.eventFilter.day;

    const text = (' ' + this.props.eventFilter.filter).slice(1).toLowerCase();

    const filteredEvents = this.props.events.events.filter((event) => {
      return weekdayInBetweenDates(day, event.startDate, event.endDate)
        && ((event.address && event.address.toLowerCase().indexOf(text) >= 0)
        || (event.venue && event.venue.toLowerCase().indexOf(text) >= 0)
        || (event.title && event.title.toLowerCase().indexOf(text) >= 0));
    });

    this.props.setFilteredEvents(filteredEvents);
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
    }

    const onSelectDay = (day) => {
      this.props.selectDay(day);
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
              placeholderTextColor="#000000"
              style={{ ...pickerSelectStyles }}
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    color: 'black',
  },
  icon: {
    borderLeftWidth: 0,
    borderLeftColor: 'transparent',
    borderTopWidth: 2,
    borderTopColor: 'black',
    borderRightWidth: 2,
    borderRightColor: 'black',
    width: 9,
    height: 9,
    right: 15,
    top: 5,
    transform: [{ translateY: 8 }, { rotate: '135deg' }],
  },
  underline: {
    borderTopColor: 'transparent'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
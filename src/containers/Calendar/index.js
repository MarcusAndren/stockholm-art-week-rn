import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import ListEvent from 'saw/src/components/ListEvent';
import { EventsApi } from 'saw/src/apis';

const StyledView = styled.View`
  background-color: #FFF;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding: 200px 20px 0;
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
        events: response
      });
    });
  }

  render() {
    if(this.state.isLoading) {
      return (
        <StyledView>
          <Text>Calendar</Text>
        </StyledView>
      ); 
    }

    return (
      <StyledView>
        <ListEvent event={this.state.events[0]}></ListEvent>
        <ListEvent event={this.state.events[1]}></ListEvent>
      </StyledView>
    );
  }
}

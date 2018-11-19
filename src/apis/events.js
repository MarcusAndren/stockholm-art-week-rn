export default class EventsApi {
  async getEvents() {
    try {
      let response = await fetch(
        'http://www.stockholmartweek.se/api/events'
      );

      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }
}
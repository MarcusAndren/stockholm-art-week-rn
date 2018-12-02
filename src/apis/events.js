export default class EventsApi {
  async getEvents() {
    try {
      let response = await fetch(
        'http://www.stockholmartweek.se/api/events'
      );

      let json = await response.json();

      return await json.sort(function(a, b) {
          a = new Date(a.startDate);
          b = new Date(b.startDate);
          return a > b ? 1 : a < b ? -1 : 0;
        });
    } catch(error) {
      console.error(error);
    }
  }
}
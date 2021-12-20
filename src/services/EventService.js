import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const EventService = {
  getEvents(page, limit = 2) {
    return apiClient.get('/events/?_page=' + page + '&_limit=' + limit);
  },
  getEvent(id) {
    return apiClient.get('/events/' + id);
  }
};
export default EventService;

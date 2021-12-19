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
  getEvents() {
    return apiClient.get('/events');
  },
  getEvent(id) {
    return apiClient.get('/events/' + id);
  }
};
export default EventService;

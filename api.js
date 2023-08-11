import axios from 'axios';

const api = axios.create({
  API_BASE_URL : 'http://192.168.2.27:8000/api/'
});

export default api;
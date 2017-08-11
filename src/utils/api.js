import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': Config.API_KEY
  }
});

export default axiosInstance;
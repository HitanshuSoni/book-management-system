import axios from 'axios';
import { BASE_URL } from './API/constants';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
  });
  
  export default axiosInstance;
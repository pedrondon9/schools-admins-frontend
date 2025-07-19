import axios from 'axios';
import { URL_SERVER } from '../contexts/constantesVar';
const token = JSON.parse(window.localStorage.getItem('enableTAdmins'))
  ? JSON.parse(window.localStorage.getItem('enableTAdmins')).tokI
  : '';
const axiosConfigs = axios.create({
  baseURL: URL_SERVER,
  headers: {
    'x-access-token': token,
  },
});

export default axiosConfigs;

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://be-aclc-carrental.herokuapp.com/api'
  // baseURL: 'http://127.0.0.1:8000/api'
});

export default API;
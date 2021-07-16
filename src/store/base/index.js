import axios from 'axios';

const API = axios.create({
  baseURL: 'https://carrental-cloudbased-be.herokuapp.com/api'
});

export default API;
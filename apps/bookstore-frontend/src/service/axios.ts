import axios from 'axios';

// TODO: Improve baseURL to use environment variables

const instance = axios.create({
  baseURL: 'http://localhost:3333'
});

// Intercept error
instance.interceptors.response.use(
  response => response,
  error => {

    if (!error.response || !error.response.data || !error.response.data.message) {
      throw new Error("Request failed. Please try later");
    }

    throw new Error(error.response.data.message);
  }
);

export default instance;

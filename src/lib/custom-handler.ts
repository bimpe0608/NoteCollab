import axios from 'axios';

console.log(
  process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL
    : 'https://bridge-staging-api.up.railway.app/api/v1',
  'server',
);

const requestHandler = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL
    : 'https://bridge-staging-api.up.railway.app/api/v1',
});

export default requestHandler;

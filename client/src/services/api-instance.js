import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default apiInstance;

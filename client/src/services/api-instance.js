import axios from "axios";
import firebase from "app-firebase";

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

apiInstance.interceptors.request.use((config) => {
  config.headers["Authorization"] = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "";
  return config;
});

export default apiInstance;

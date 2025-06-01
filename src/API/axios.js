// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-af8c8/us-central1/api"
});

export default axiosInstance; // 👈 This makes importing simpler

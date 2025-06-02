
import axios from "axios";

const axiosInstance = axios.create({
  //local instance of firebase function
  // baseURL: "http://127.0.0.1:5001/clone-af8c8/us-central1/api",
   //deployed version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-uz1i.onrender.com/"
});

export default axiosInstance; 

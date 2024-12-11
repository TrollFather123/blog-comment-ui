import axios from "axios";
import { parseCookies } from "nookies";

const baseURL = process.env.NEXT_APP_BASE_URL;
export const mediaURL = process.env.NEXT_APP_MEDIA_URL;

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const cookies = parseCookies();
    const token = cookies["token"];

    if(token !== undefined && token !== null){
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

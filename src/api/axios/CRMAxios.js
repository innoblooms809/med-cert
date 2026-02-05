// "use server"
import axios from "axios";
import { cookies } from 'next/headers'
import { getCookieData } from "@/utils/helperFunction";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL




const instanceForFormdata = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 8000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async(config) => {
    const token = await getCookieData("token")


    if (token?.value) {
      config.headers.Authorization = `Bearer ${token?.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceForFormdata.interceptors.request.use(
  async(config) => {
    const token = await getCookieData("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token?.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceForFormdata.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance, instanceForFormdata };

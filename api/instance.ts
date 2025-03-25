import axios from "axios";

export const Axiosinstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// multi part form data
export const AxiosinstanceFormData = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// vtu data
export const Vtuinstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VTU_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

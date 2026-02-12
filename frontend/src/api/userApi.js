import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: "https://mern-user-management-backend-387c.onrender.com/api/users",
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    // If it's a 404 on a single user fetch, we might handle it in the component
    // but for general errors, toast is better than alert
    if (error.response?.status !== 404) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    }
    return Promise.reject(error);
  }
);

export default API;

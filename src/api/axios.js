import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-backend-ip7e.onrender.com/api/",
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-1p5i.onrender.com/api/",
});

export default api;

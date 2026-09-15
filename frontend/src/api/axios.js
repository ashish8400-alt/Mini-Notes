import axios from "axios";

const api = axios.create({
  baseURL: "https://mini-notes-backend-4nen.onrender.com/api",
});

export default api;
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

console.log({ API_BASE_URL });

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

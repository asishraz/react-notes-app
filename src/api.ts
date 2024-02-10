// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/notes/api',  // Adjust the URL to match your Django backend
});

export default api;

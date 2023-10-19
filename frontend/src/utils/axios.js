import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API}`,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use((originalResponse) => {
  originalResponse.data = handleDates(originalResponse.data);
  return originalResponse;
});

export { api }
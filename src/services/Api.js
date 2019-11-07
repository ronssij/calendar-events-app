import axios from 'axios'
import env from '@/services/env'

const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': env.BASE_URL,
  }
})

api.interceptors.response.use((response) => response, (error) => {
  return Promise.reject(error)
});

export default api

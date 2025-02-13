import axios from 'axios'

export * from './pokemon'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export default api

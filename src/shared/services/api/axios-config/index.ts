import { errorInterceptors, responseInterceptor } from './interceptors';
import axios from 'axios'

const Api = axios.create({
  baseURL: 'http://localhost:3333'
})

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptors(error),
)

export {Api}
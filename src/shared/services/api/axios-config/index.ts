import axios from 'axios'
import { Environment } from './../../../environment/index';
import { errorInterceptors, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.BASE_URL,
  headers: {
    Autorization: `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN')}`
  }
})

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptors(error),
)

export {Api}
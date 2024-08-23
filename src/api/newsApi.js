import { LOGIN } from './uri'
import request from '../utils/request'
export function login(params) {
  return request.post(LOGIN, params)
}
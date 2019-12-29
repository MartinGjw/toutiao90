import request from '../utils/request'
import { API_ARTICLES, API_CHANNELS } from '../constant/API'

export function getarticle (params, id, method) {
  return request({
    url: id ? API_ARTICLES + `/${id}` : API_ARTICLES,
    params,
    method
  })
}
export function getcannel () {
  return request({
    url: API_CHANNELS
  })
}

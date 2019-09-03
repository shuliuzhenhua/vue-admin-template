import request from '@/utils/request'

export function getVueRouter() {
  return request.get('/configs/vue-routers')
}

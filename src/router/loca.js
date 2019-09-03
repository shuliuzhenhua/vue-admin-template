import Layout from '@/layout'
import pages from '@/views/pages'
import router from '@/router'
import { getToken } from '@/utils/auth'

const arr = []
export function buildRouters(data, is_children = 0) {
  const children = []
  for (const item of data) {
    const router = {
      path: item.path,
      component: pages[item.path] || Layout,
      name: item.name,
      meta: {
        title: item.name,
        icon: item.icon
      },
      children: buildRouters(item['children'], 1)
    }
    if (is_children) {
      children.push(router)
    } else {
      arr.push(router)
    }
  }
  if (is_children) {
    return children
  }
  return arr
}

const vueRouters = JSON.parse(localStorage.getItem('VUE_ROUTERS'))
const hasToken = getToken()
if (hasToken && vueRouters && vueRouters.length) {
  const routers = buildRouters(vueRouters)
  router.addRoutes(routers)
  router.options.routes = router.options.routes.concat(routers)
}

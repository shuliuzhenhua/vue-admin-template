import { getVueRouter } from '@/api/router'
import { getToken } from '@/utils/auth' // get token from cookie
import Layout from '@/layout'
import pages from '@/views/pages'
import router from '@/router'

// {
//   path: '/example',
//   component: Layout,
//   redirect: '/example/table',
//   name: 'Example',
//   meta: { title: 'Example', icon: 'example' },
//   children: [
//     {
//       path: 'table',
//       name: 'Table',
//       component: () => import('@/views/table/index'),
//       meta: { title: 'Table', icon: 'table' }
//     },
//     {
//       path: 'tree',
//       name: 'Tree',
//       component: () => import('@/views/tree/index'),
//       meta: { title: 'Tree', icon: 'tree' }
//     }
//   ]
// },

// {
//   cache: false,
//   icon: null,
//   id: 26,
//   menu: true,
//   order: 0,
//   parent_id: 0,
//   path: null,
//   permission: null,
//   roles: [],
//   title: 'Nested',
//   children: [
//     {
//       cache: false,
//       icon: null,
//       id: 27,
//       menu: true,
//       order: 0,
//       parent_id: 26,
//       path: '/nested/menu1',
//       permission: null,
//       roles: [],
//       title: 'menu1'
//     }
//   ]
// }

const arr = []
export function buildRouters(data, is_children = 0) {
  const children = []
  for (const item of data) {
    const router = {
      path: item.path,
      component: pages[item.path] || Layout,
      name: item.title,
      meta: {
        title: item.title,
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

export default {
  namespaced: true,
  state: {
    vueRouters: [],
    baseRouters: []
  },
  actions: {
    async getRouter({ commit }) {
      const hasToken = getToken()
      if (hasToken) {
        const { data } = await getVueRouter()
        const routers = buildRouters(data)
        router.addRoutes(routers)
        router.options.routes = router.options.routes.concat(routers)
        commit('SET_VUE_ROUTERS', routers)
      }
      return true
    }
  },
  mutations: {
    SET_VUE_ROUTERS(state, routers) {
      state.vueRouters = routers
      localStorage.setItem('VUE_ROUTERS', JSON.stringify(routers))
    },
    CLEAR_VUE_ROUTERS(state) {
      state.vueRouters = []
      localStorage.removeItem('VUE_ROUTERS')
    }
  }
}

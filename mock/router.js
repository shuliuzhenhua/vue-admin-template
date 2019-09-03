export default [
  {
    url: '/configs/vue-router',
    response: () => {
      return {
        code: 20000,
        data: [
        //   {
        //   cache: false,
        //   children: [],
        //   icon: null,
        //   id: 1,
        //   menu: true,
        //   order: 0,
        //   parent_id: 0,
        //   path: 'index',
        //   permission: null,
        //   roles: [],
        //   title: '首页'
        // },
          {
            cache: false,
            icon: null,
            id: 26,
            menu: true,
            order: 0,
            parent_id: 0,
            path: '/nested',
            permission: null,
            roles: [],
            title: 'Nested',
            children: [
              {
                cache: false,
                icon: null,
                id: 27,
                menu: true,
                order: 0,
                parent_id: 26,
                path: '/nested/menu1',
                permission: null,
                roles: [],
                title: 'menu1',
                children: []
              }
            ]
          }
        ]
      }
    }
  }
]

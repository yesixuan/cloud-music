const router = [
  {
    path: '/index',
    name: 'index',
    component(resolve) {
      require.ensure(['./views/index'], () => {
        resolve(require('./views/index'))
      })
    },
    children: [{ // 发现页
        path: 'find',
        name: 'find',
        component(resolve) {
          require.ensure(['./views/find/find'], () => {
            resolve(require('./views/find/find'))
          })
        },
        meta: { keepAlive: true }
    }],
    meta: { keepAlive: true }
  },
  { // 搜索页
    path: '/search',
    name: 'search',
    component(resolve) {
      require.ensure(['./views/search'], () => {
        resolve(require('./views/search'))
      })
    },
    meta: { keepAlive: true }
  },
  { // 歌曲播放页
    path: 'player/:id',
    neme: 'player',
    component(resolve) {
      require.ensure(['./views/player'], () => {
        resolve(require('./views/player'))
      })
    },
    meta: { keepAlive: false }
  },
  { // 歌曲列表页
    path: 'playlist/:id',
    neme: 'playlist',
    component(resolve) {
      require.ensure(['./views/playList'], () => {
        resolve(require('./views/playList'))
      })
    },
    meta: { keepAlive: false }
  },
  { // 歌手详情页
    path: 'singer/:id',
    neme: 'singer',
    component(resolve) {
      require.ensure(['./views/singer'], () => {
        resolve(require('./views/singer'))
      })
    },
    meta: { keepAlive: false }
  },
  { // 专辑详情页
    path: 'album/:id',
    neme: 'album',
    component(resolve) {
      require.ensure(['./views/album'], () => {
        resolve(require('./views/album'))
      })
    },
    meta: { keepAlive: false }
  },
  { // 用户详情页
    path: 'user/:id',
    neme: 'user',
    component(resolve) {
      require.ensure(['./views/user'], () => {
        resolve(require('./views/user'))
      })
    },
    meta: { keepAlive: false }
  },
  {
    path: '*',
    redirect: '/index'
  }
]

export default router

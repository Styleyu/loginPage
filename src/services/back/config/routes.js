/**
 * 编写路由跳转
 * 
 */

const routes = [
  {
    path: '/user/detail',
    component: () => import('_back/views/user/UserDetailView.vue')
  },
  {
    path: '/user/test',
    component: () => import('_back/views/user/UserTestView.vue')
  }
]

export default routes
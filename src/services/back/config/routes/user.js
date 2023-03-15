export default {
  path: 'user',
  component: () => import('_back/views/user/UserView.vue'),
  menuName: '用户信息',
  menuIcon: '',
  children: [
    {
      path: 'detail',
      component: () => import('_back/views/user/UserDetailView.vue'),
      menuName: '用户详情',
      menuIcon: '',
    },
    {
      path: 'test',
      component: () => import('_back/views/user/UserTestView.vue'),
      menuName: '用户测试',
      menuIcon: '',
    }
  ]
}
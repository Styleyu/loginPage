/**
 * 编写路由跳转和绑定到菜单
 * path: 路由 不添加/
 * menuName: 显示在菜单的文字
 * menuIcon: 显示在菜单的图标名, font awesome的icon属性
 * component: 异步调用函数，返回异步组件
 * 
 * NOTE: 使用path而不是name进行路由导航
 */
const config = [
  {
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
  },
  {
    path: 'project',
    menuName: '我的项目',
    children: [
      {
        path: 'commit',
        menuName: '提交新项目',
      },
      {
        path: 'examine',
        menuName: '项目审批',
      },
      {
        path: 'progress',
        menuName: '查看进度',
      }
    ]
  },
  {
    path: 'plan',
    menuName: '培养方案',
    children: [
      {
        path: 'create',
        menuName: '制定培养方案',
      },
      {
        path: 'read',
        menuName: '查看培养方案',
      }
    ]
  }
]


export default config

/*
 * 菜单项
 * path对应于路由的path
 * name, icon, children(可选，数组)
 * icon值为字符串，为fontAwesome对应组件的icon属性
*/
const menus = [
  {
    name: '用户信息',
    icon: '',
    path: '/user',
    children: [
      {
        name: '用户详情',
        path: '/detail'
      },
      {
        name: '用户测试',
        path: '/test'
      }
    ]
  },
  {
    name: '我的项目',
    path: '/project',
    children: [
      {
        name: '提交新项目',
        path: '/commit'
      },
      {
        name: '查看已有',
        path: '/has'
      }
    ]
  },
  {
    name: '培养方案',
    path: '/plan',
    children: [
      {
        name: '制定培养方案',
        path: '/create'
      },
      {
        name: '查看培养方案',
        path: '/read'
      }
    ]
  }
]

  // 预处理
  ; ((menus) => {
    const preProcess = (item, parentPath) => {
      item.path = parentPath + item.path
      if (item.children) {
        item.children.forEach(i => preProcess(i, item.path))
      }
    }
    menus.forEach(i => preProcess(i, ''))
  })(menus)

export default menus
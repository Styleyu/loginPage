/**
 * 编写路由跳转和绑定到菜单
 * path: 路由 不添加/
 * menuName: 显示在菜单的文字
 * menuIcon: 显示在菜单的图标名, font awesome的icon属性
 * component: 异步调用函数，返回异步组件
 *
 * NOTE: 使用path而不是name进行路由导航
 * 在本文件夹新建自己的路由配置，通过导入方式，添加到config
 */

import user from "./user"
import plan from './plan'

const config = [
  user,
  // @todo
  plan
]


export default config

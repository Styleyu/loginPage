import Vue from 'vue'
import VueRouter from 'vue-router'
import routesConfig from '../config/routes'
import RootView from '../views/RootView.vue'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => {
    // 原地跳转
    if (err.type !== 16) throw err
  })
}

// 从配置文件中得到routes
const filterRoutes = (routesConfig) => {
  const routes = [{
    path: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BACK_LOCATION,
    component: RootView,
    children: []
  }]
  /**
   * @param {object} item 
   * @param {string} basePath a/b/
   * @param {boolean}
   */
  const recur = (item) => {
    const copyItem = {
      path: item.path,
      component: item?.component,
    }

    if (item.children) {
      let children = []
      for (let c of item.children) {
        children.push(recur(c, copyItem.path))
      }
      copyItem.children = children
    }
    return copyItem
  }

  routesConfig.forEach(i => {
    routes[0].children.push(recur(i))
  })

  return routes

}


const routes = filterRoutes(routesConfig)



Vue.use(VueRouter)
// console.log(routes);
const router = new VueRouter({
  mode: 'history',
  routes
})


export default router
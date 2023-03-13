import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../config/routes'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => { 
    // 原地跳转
    if(err.type !== 16) throw err
   })
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})


export default router
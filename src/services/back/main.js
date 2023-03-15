import Vue from 'vue'
import App from './App.vue'
/* router */
import router from './router'
/* state */
import store from './state'
/* UI */
import 'normalize.css'
// import ElementUI from './config/elUI'
import FontAwesomeIcon from './config/fontUI'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/* mixins */
import mixins from './mixins'

Vue.use(ElementUI)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

mixins.forEach(m => Vue.mixin(m))

new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate(){
    // 全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
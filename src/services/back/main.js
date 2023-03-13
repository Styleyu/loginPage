import Vue from 'vue'
import App from './App.vue'

/* state */
import store from './state'
/* UI */
import 'normalize.css'
// import ElementUI from './config/elUI'
import FontAwesomeIcon from './config/fontUI'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
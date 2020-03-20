import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../utils/element-ui'
import moment from 'moment'
import MyBread from './components/cuscom/MyBread.vue'
Vue.component('my-bread',MyBread)
// 引入全局axios插件
import MyServerHttp from '../network/http.js'
Vue.use(MyServerHttp);

Vue.config.productionTip = false

//全局过滤器-处理日期
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

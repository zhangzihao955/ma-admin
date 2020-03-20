import Vue from 'vue'
import VueRouter from 'vue-router'

const Login =()=> import ('../components/login/Login.vue');
const Home =()=> import ('../components/home/Home.vue');
const Users = ()=> import ('../components/users/Users.vue');
const Rights=()=> import ('../components/rights/Rights.vue');
const Role=()=> import ('../components/rights/role.vue');
// 商品列表
const GoodsList=()=> import ('../components/goods/GoodsList.vue');
// 添加商品
const GoodsAdd=()=> import ('../components/goods/GoodsAdd.vue');
// 商品分类
const CateParams=()=> import ('../components/goods/CateParams.vue')
Vue.use(VueRouter)
// 在js文件里使用组件
import {Message} from 'element-ui';
Vue.use(Message);
const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/',
    component:Home,
    children:[
      {
        path:'/users',
        component:Users
      },
      {
        path:'/rights',
        component:Rights
      },
      {
        path:'/role',
        component:Role
      },
      {
        path:'/goodslist',
        component:GoodsList
      },
      {
        path:'goodsadd',
        component:GoodsAdd
      },
      {
        path:'categories',
        component:CateParams
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

//在路由配置生效之前，统一判断token
//路由守卫 在路由配置生效之前
//路由/导航 守卫
//to-> 要去的路由配置
//from -> 当前的路由配置
//
// router.beforeEach((to,from,next)=>{

// //如果要去的是登录->next()
// //如果要去的不是登录
// //判断token ，如果没有token跳到登录，如果有继续往下跳转
// if(to.path==='/login'){
//   next()
// }else{
//  const token = localStorage.getItem('token');
//  if(!token){
//   //  提示
//   Message.warning('回到登录页');
//    router.push('/login');
//    return
//  } 
//  next()
// }
// })
export default router

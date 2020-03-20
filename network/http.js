import Vue from 'vue';
import axios from 'axios';
// 把axios变成全局方法
// 在main.js中导入  并使用vue。use()
const MyHttpServer={};
MyHttpServer.install = (vue)=>{
    // 设置全局请求路径  在成为实例属性之前
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
    //除了登录之外的所有请求都需要设置头部，需要设置在拦截器里
    //  const AUTH_TOKEN = localStorage.getItem('token');
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

    // 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做什么  --》在发起请求之前设置头部
    console.log('拦截器被触发',config,config.url);
    // 如果请求的标识不等于login才给它加上请求头
    if(config.url!=='login'){
        const AUTH_TOKEN = localStorage.getItem('token');
        config.headers['Authorization'] = AUTH_TOKEN;
    };

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

    
    // 添加实例方法
    Vue.prototype.$http = axios
}
export default MyHttpServer

//用法和之前一样 this.$http.get()
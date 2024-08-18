import axios from 'axios';
import store from '../store'; // 引入Vuex store

// 创建axios实例
const service = axios.create({
  baseURL: "", // API的base_url
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
      config.headers["Content-Type"] = "application/json"
      console.log(store.state.token);
      
    // 可以在请求发送之前做一些处理，例如加入token
    if (config.url.includes('/login') || config.url.includes('/register')) {
      return config;
    }
    if (store.state.token) {
      config.headers['Authorization'] = `Bearer ${store.state.token}`;
    }
    return config;
  },
  error => {
    console.error(error); // 请求错误处理
    return Promise.reject(error);
  }
);

export default service;
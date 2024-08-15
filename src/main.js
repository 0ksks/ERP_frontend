import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIconList from '@element-plus/icons-vue'
import './assets/styles.css';  // 引入全局样式
// 引入 Mock 服务
import './mocks/Supplier.js';
import './mocks/Material.js';
import './mocks/DocumentFlow.js';

const app = createApp(App);

for (const name in ElIconList) {
    app.component(name, ElIconList[name])
  }
  
app.use(ElementPlus);


app.use(store).use(router).mount('#app');

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';

// 使用懒加载的方式加载其他组件
const Supplier = () => import(/* webpackChunkName: "supplier" */ '../components/Supplier.vue');
const Material = () => import(/* webpackChunkName: "material" */ '../components/Material.vue');
const NewSupplier = () => import('../components/NewSupplier.vue');
const ModifySupplier = () => import('../components/ModifySupplier.vue');
const NewMaterial = () => import('../components/NewMaterial.vue');
const ModifyMaterial = () => import('../components/ModifyMaterial.vue');
const Stock = () => import('../components/Stock.vue');
const DocumentFlow = () => import('../components/DocumentFlow.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/Supplier', component: Supplier },
  { path: '/Material', component: Material },
  { path: '/NewSupplier', component: NewSupplier },
  { path: '/ModifySupplier/:id', component: ModifySupplier, name: 'ModifySupplier' }, // 更新为带参数的路径
  { path: '/NewMaterial', component: NewMaterial },
  { path: '/ModifyMaterial/:id', component: ModifyMaterial, name: 'ModifyMaterial' }, // 更新为带参数的路径
  { path: '/Stock', component: Stock },
  { path: '/DocumentFlow', component: DocumentFlow },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

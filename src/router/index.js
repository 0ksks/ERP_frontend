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
const PO = () => import('../views/PO.vue')
const Receipt = () => import('../views/Receipt.vue')


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
  {
      path: '/po',
      name: 'po',
      component: PO,
      redirect:'/pomain',
      children: [
        {
          path:'/pomain',
          name:'pomain',
          component: () => import('../components/POmain.vue'),
        },
        {
          path:'/create',
          name:'create',
          component: () => import('../components/POcreate.vue'),
        },
        {
          path:'/modify',
          name:'modify',
          component: () => import('../components/POmodify.vue'),
        },
      ]
    },
    {
      path: '/rec',
      name: 'rec',
      component: Receipt,
      redirect:'/recmain',
      children: [
        {
          path:'/recmain',
          name:'recmain',
          component: () => import('../components/REmain.vue'),
        },
        {
          path:'/recreate/:poDetail',
          name:'recreate',
          component: () => import('../components/REcreate.vue'),
        },
      ]
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

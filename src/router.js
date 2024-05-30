import { createRouter, createWebHistory } from 'vue-router';
import AdminPage from './pages/AdminPage.vue';
import AddProducts from '../src/components/addProducts.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: AdminPage},
    { path: '/admin', component: AdminPage},
    { path: '/addProducts', component: AddProducts },
  ]
});

export default router;
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Auth from '../views/Auth.vue';
import Chat from '../views/Chat.vue';
import Home from '../views/Home.vue';
import { auth } from '@/firebase';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/chat/:id',
    name: 'Chat',
    component: Chat,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!auth.currentUser && to.name !== 'Auth') {
    next('/auth');
  }else {
    next();
  }
});

export default router;

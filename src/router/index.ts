import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Auth from '../views/Auth.vue';
import Chat from '../views/Chat.vue';
import Home from '../views/Home.vue';
import { auth } from '@/firebase';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
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
  auth.onAuthStateChanged(_ => {
    if (!auth.currentUser && to.name !== 'Auth') {
      console.log('here');
      next('/auth');
    } else {
      next();
    }
  });
});

export default router;

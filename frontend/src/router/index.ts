import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '../views/Auth.vue';
import Boards from '@/views/Boards.vue';
import Board from '@/views/Board.vue';
import user from '@/store/user';

Vue.use(VueRouter);

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
        meta: { public: true },
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/',
        name: 'home',
        component: Boards,
    },
    {
        path: '/boards/:id',
        name: 'board',
        component: Board,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(route => !route.meta.public);

    if (!user.isLoggedIn && requiresAuth) {
        next({ name: 'auth' });
    }

    if (user.isLoggedIn && to.name === 'auth') {
        next({ name: 'boards' });
    }

    next();
});

export default router;

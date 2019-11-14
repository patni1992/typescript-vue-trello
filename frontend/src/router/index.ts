import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '../views/Auth.vue';
import Boards from '@/views/Boards.vue';
import user from '@/store/user';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
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
        path: '/boards',
        name: 'boards',
        component: Boards,
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

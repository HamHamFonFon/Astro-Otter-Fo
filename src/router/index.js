import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
        meta: {}
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomePage.vue'),
        meta: {
            layout: 'home',
            key: "menu.home",
            text: "Home",
            icon: "mdi-view-dashboard-outline",
        }
    }
    // DSO
    // Constellation
    // Astrobin
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
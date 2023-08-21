import { createRouter, createWebHistory } from 'vue-router'

import backgroundAstrobin from '@/assets/images/background/astrobin.png'
import backgroundConstellation from '@/assets/images/background/constellations.jpg'
import backgroundCatalogs from '@/assets/images/background/bg-4.webp'

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
    },
    // DSO
    {
        path: '/catalogs',
        name: 'catalogs',
        component: () => import('@/views/CatalogsPage.vue'),
        meta: {
            layout: 'page',
            key: "menu.catalogs",
            description: 'Explore all deep space objects',
            text: 'Catalogs',
            icon: 'catalogs',
            image: backgroundCatalogs
        }
    },
    {
        path: '/catalog/:dtoId',
        name: 'dso',
        // component: () => import(''),
        meta: {
            layout: 'page',
            key: "menu.dso",
            text: ''
        }
    },

    // Constellation
    {
        path: '/constellations',
        name: 'constellations',
        component: () => import('@/views/Constellations.vue'),
        meta: {
            layout: 'page',
            key: "menu.constellations",
            text: 'Constellations',
            icon: 'constellation',
            description: 'Explore the 88 constellations',
            image: backgroundConstellation
        }
    },
    // Astrobin
    {
        path: '/astrobin',
        name: 'astrobin',
        component: () => import('@/views/Astrobin.vue'),
        children: [
            {
                path: 'image-of-the-day',
                name: 'today',
                // component: () => import(''),
            },
            {
                path: 'top-picks',
                name: 'toppicks',
                // component: () => import(''),
            },
            {
                path: 'image/:astrobinId',
                name: 'image',
            }
        ],
        meta: {
            layout: 'page',
            key: "menu.astrobin",
            icon: '',
            text: 'Astrobin API',
            description: 'Search, filter and sort images from Astrobin API',
            image: backgroundAstrobin
        }

    },
    {
        path: '/:notFound',
        component: () => import('@/views/NotFound.vue'),
        meta: {
            layout: 'default'
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
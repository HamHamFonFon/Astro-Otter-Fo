import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';
import { refreshTokens, login } from '@/services/auth';

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
            description: 'Browse all catalogs, seek amazing deep space objects and explore wonders of the universe',
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
        component: () => import('@/views/constellations/ConstellationList.vue'),
        children: [
            {
                path: ':constellationId',
                name: 'constellation',
                component: () => import('@/views/constellations/ConstellationPage.vue'),
                meta: {
                    layout: 'page',
                    key: '',
                    text: ''
                }
            }
        ],
        meta: {
            layout: 'page',
            key: "menu.constellations",
            text: 'Constellations',
            icon: 'constellation',
            description: 'Explore the 88 constellations and discover their different objects',
            image: backgroundConstellation
        }
    },
    // Astrobin
    {
        path: '/astrobin',
        name: 'astrobin',
        component: () => import('@/views/astrobin/Astrobin.vue'),
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
            description: 'Search, filter, play and sort images from Astrobin API',
            image: backgroundAstrobin
        }
    },
    {
        path: '/contact-us',
        name: 'contact',
        meta: {
            layout: 'page',
            icon: 'mdi-pencil',
            key: 'menu.contact',
            text: 'Contact',
            description: ''
        }
    },
    {
        path: '/support-astro-otter',
        name: 'support',
        meta: {
            layout: 'page',
            key: 'menu.support',
            text: 'Support',
            description: ''
        }
    },
    {
        path: '/legal-notice',
        name: 'legal_notice',
        meta: {
            layout: 'page',
            key: 'menu.legal_notice',
            text: 'Legal notice',
            description: ''
        }
    },
    {
        path: '/help/api',
        name: 'astro_otter_api',
        meta: {
            layout: 'page',
            key: 'menu.astro_otter_api',
            text: 'API',
            description: ''
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

router.beforeEach(async (to, from, next) => {
    /**
     * Refresh Token before all route
     */
    console.log('JWT Token exist:'+ store.getters["auth/isLoggedIn"]);
    if (store.getters["auth/isLoggedIn"]) {
        await refreshTokens();
    } else {
        await login();
    }

    if (true === to.meta.requiresAuth) {
        next("login");
    }
    next();

});

export default router
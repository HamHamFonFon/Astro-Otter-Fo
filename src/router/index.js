import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';
import {login} from '@/services/auth';

import backgroundAstrobin from '@/assets/images/background/astrobin.png'
import backgroundIOTD from '@/assets/images/background/bg-6.webp'
import backgroundConstellation from '@/assets/images/background/constellations.jpg'
import backgroundCatalogs from '@/assets/images/background/background_vlt.jpg';
import CustomIcon from "@/components/icons/CustomIcon.vue"; // '@/assets/images/background/bg-4.webp'

const routes = [
    {
        path: '/',
        name: 'root',
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
            // seo
            title: 'Explore wonders and mysteries of the universe',
            description: 'Astro Otter is a celestial atlas containing more than 9600 deep sky objects, grouped by different catalog or type of object. Search, discover and marvel.'
        }
    },
    // DSO
    {
        path: '/catalogs',
        name: 'catalogs',
        component: () => import('@/views/dso/CatalogsPage.vue'),
        meta: {
            layout: 'page',
            key: "menu.catalogs",
            text: 'Catalogs',
            icon: CustomIcon,
            image: backgroundCatalogs,
            // seo
            title: '',
            description: 'Browse all catalogs, seek amazing deep space objects and explore wonders of the universe',
        }
    },
    {
        path: '/catalog/:id',
        name: 'dso',
        component: () => import('@/views/dso/DsoPage.vue'),
        meta: {
            layout: 'page',
            key: "menu.dso",
            text: ''
        }
    },
    // Constellations
    {
        path: '/constellations',
        name: 'constellations',
        component: () => import('@/views/constellations/ConstellationList.vue'),
        meta: {
            layout: 'page',
            key: "menu.constellations",
            text: 'Constellations',
            icon: 'constellation',
            image: backgroundConstellation,
            // seo
            title: 'Constellations',
            description: 'Explore the 88 constellations and discover their different objects',
        }
    },
    {
        path: '/constelllations/:constellationId/:constellationName',
        name: 'constellation',
        component: () => import('@/views/constellations/ConstellationPage.vue'),
        meta: {
            layout: 'page',
            key: '',
            // seo
            title: '',
            description: '',
        }
    },
    // Astrobin
    {
        path: '/astrobin',
        name: 'astrobin',
        component: () => import('@/views/astrobin/AstrobinHome.vue'),
        children: [
            {
                path: 'top-picks',
                name: 'toppicks',
                // component: () => import(''),
                meta: {
                    layout: 'page',
                    key: "menu.astrobin.toppicks",
                    text: 'Top-picks',
                    icon: '',
                    description: '',
                    image: backgroundConstellation
                }
            },
        ],
        meta: {
            layout: 'page',
            key: "menu.astrobin",
            icon: 'mdi-tooltip-text-outline',
            text: 'Astrobin API',
            image: backgroundAstrobin,
            // seo
            title: '',
            description: 'Search, filter, play and sort images from Astrobin API',
        }
    },
    {
        path: '/astrobin/image-of-the-day',
        name: 'today',
        component: () => import('@/views/astrobin/ImageOfTheDay.vue'),
        meta: {
            layout: 'page',
            key: "menu.astrobin.today",
            text: 'Image of the day',
            icon: '',
            image: backgroundIOTD,
            // seo
            title: 'Astrobin Image Of The Day',
            description: 'Display selected image of the day and last ten images of the day',
        }
    },
    {
        path: '/astrobin/browse-images',
        name: 'browser',
        component: () => import('@/views/astrobin/BrowseImages.vue'),
        meta: {
            layout: 'page',
            key: "menu.astrobin.images",
            text: 'Browse Astrobin API',
            icon: '',
            image: backgroundConstellation,
            title: 'Astrobin images browser',
            description: 'Search, filter and sort images from Astrobin website',

        }
    },
    // Contact
    {
        path: '/contact-us',
        name: 'contact',
        meta: {
            layout: 'page',
            icon: 'mdi-pencil',
            key: 'menu.contact',
            text: 'Contact',
            // seo
            title: '',
            description: ''
        }
    },
    // Prismic
    {
        path: '/:uid',
        name: 'primisc_content',
        component: () => import('@/views/pages/prismic.vue'),
        meta: {
            layout: 'page',
            key: 'menu.support',
            text: 'Support',
            // seo
            title: '',
            description: ''
        }
    },
    /*{
        path: '/legal-notice',
        name: 'legal_notice',
        meta: {
            layout: 'page',
            key: 'menu.legal_notice',
            text: 'Legal notice',
            // seo
            title: '',
            description: ''
        }
    },*/
    {
        path: '/api',
        name: 'astro_otter_api',
        meta: {
            layout: 'page',
            key: 'menu.astro_otter_api',
            text: 'API',
            // seo
            title: '',
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
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    // Set refresh JWT token for requests
    const timestamp = new Date().getTime()
    // console.log(store.getters["auth/isLoggedIn"])
    if (true === store.getters["auth/isLoggedIn"]) {
        let expireTokenDate = store.getters["auth/getJwtExp"].exp ?? null;
        if (expireTokenDate && expireTokenDate < timestamp) {
            //await refreshToken();
        } else {
            await login();
        }
    } else {
        await login();
    }

    // SEO
    document.title = 'Astro-Otter - ' + to.meta.title ?? 'Astro-Otter';

    if (true === to.meta.requiresAuth) {
        next("login");
    }
    next();
});

export default router
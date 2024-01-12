import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store';
import {login} from '@/services/auth';

import backgroundAstrobin from '@/assets/images/background/astrobin.png'
import backgroundIOTD from '@/assets/images/background/bg-6.webp'
import backgroundConstellation from '@/assets/images/background/constellations.jpg'
import backgroundCatalogs from '@/assets/images/background/background_vlt.jpg';

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
      icon: "mdi-view-dashboard-outline",
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
      icon: 'iconDso',
      image: backgroundCatalogs,
    }
  },
  {
    path: '/catalog/:id',
    name: 'dso',
    component: () => import('@/views/dso/DsoPage.vue'),
    meta: {
      layout: 'page',
      key: "menu.dso",
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
      icon: 'iconConstellation',
      image: backgroundConstellation,
    }
  },
  {
    path: '/constelllations/:constellationId/:constellationName',
    name: 'constellation',
    component: () => import('@/views/constellations/ConstellationPage.vue'),
    meta: {
      layout: 'page',
      key: '',
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
    component: () => import('@/views/pages/Contact.vue'),
    meta: {
      layout: 'page',
      icon: 'mdi-pencil',
      key: 'menu.contact',
    }
  },
  // Prismic
  {
    path: '/pages/:uid',
    name: 'primisc_content_page',
    component: () => import('@/views/pages/prismic.vue'),
    meta: {
      layout: 'page',
      key: 'menu.support',
    }
  },
  {
    path: '/blog/:uid',
    name: 'primisc_article_page',
    component: () => import('@/views/pages/prismic.vue'),
    meta: {
      layout: 'page',
      key: 'menu.support',
    }
  },
  {
    path: '/mercure-demo',
    name: 'poc-mercure',
    component: () => import('@/views/pages/mercure.vue'),
    meta: {
      layout: 'default'
    }
  },
  {
    name: 'pathNotFound',
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
  if (true === store.getters["auth/isLoggedIn"]) {
    /**
     * TODO fix login/refresh
     * @type {*|null}
     */
    let expireTokenDate = store.getters["auth/getJwtExp"].exp ?? null;
    if (expireTokenDate && expireTokenDate > timestamp) {
      localStorage.clear();
      //await refreshToken();
      await login();
    } else {
      await login();
    }
  } else {
    await login();
  }

  if (true === to.meta.requiresAuth) {
    next("login");
  }
  next();
});

export default router

<template>
  <!-- Hero component -->
  <HeroPresentation />

  <!-- Search autocomplete component -->
  <a ref="search" id="search"></a>
  <SearchAutocomplete />

  <!-- Page cards component -->
  <a ref="pages" id="pages"></a>
  <ItemCard :items="processedItems">
    <template v-slot="{item, index}">
      <component :is="homeComponents[item.component]" :item="item" :index="index"></component>
    </template>
  </ItemCard>

  <!-- Random DSO ? -->
  <RandomDsoHomepage />
</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, onMounted} from 'vue'
import { useI18n } from "vue-i18n";
import { useRouter} from "vue-router";

const { t } = useI18n();

import configs from "@/configs";
import backgroundImage from '@/assets/images/background/bg-1.webp'
import {applySeo} from "@/services/seo";

/**
 * Components
 */
const ItemCard = defineAsyncComponent(() => import('@/components/Home/ItemCard.vue'));
const ItemCardDefault = defineAsyncComponent(() => import('@/components/Home/Items/default.vue'));
const ItemCardBackground = defineAsyncComponent(() => import('@/components/Home/Items/background.vue'));
const homeComponents = {
  'default': ItemCardDefault,
  'background': ItemCardBackground
};

const HeroPresentation = defineAsyncComponent(() => import('@/components/Home/HeroPresentation.vue'))
const SearchAutocomplete = defineAsyncComponent(() => import("@/components/Home/SearchAutocomplete.vue"))
const RandomDsoHomepage = defineAsyncComponent(() => import("@/components/Home/RandomDsoHomepage.vue"))

/**
 * Data
 * @type {[{routeName: string},{routeName: string},{routeName: string}]}
 */
const homePageRoutes = configs.homePages;

onBeforeMount(() => {
  applySeo({
    title: t('home.explore'),
    description: t('home.description'),
    image: backgroundImage,
    imageAlt: '',
    fullUrl: ''
  });
})

/**
 * Computed
 * @type {ComputedRef<*>}
 */
const processedItems = computed(() => {
  const allRoutes = useRouter().options.routes; //this.$router.options.routes;
  return buildHomeItems(homePageRoutes, allRoutes);
});

function buildHomeItems(homePageRoutes, allRoutes) {
  return homePageRoutes.map(route => {
  let routeName = route.routeName;
  const routeItem = allRoutes.filter(route => route.name === routeName)[0];
  let path = routeItem.path;
  return {
    key: routeItem.meta.key,
    image: routeItem.meta.image,
    icon: routeItem.meta.icon,
    text: t(`${routeName}.title`),
    description: t(`${routeName}.description`),
    path: path,
    component: route.component
  }
});
}
</script>
<style scoped>
</style>

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
      <v-container class="text-center" >
        <v-row>
          <v-col cols="12" md="6">
            <v-sheet elevation="0">
              <v-card
                  elevation="0"
                  max-width="800"
                  class="mx-auto my-10"
              >
                <h1
                    style="color: #4a4d6d"
                    class="font-weight-black text-h3 text-lg-h2 text-xl-h1"
                >
                  {{ item.text }}
                </h1>
                <h2 class="text-h6 text-green mt-4 mx-auto">
                  {{ item.description }}
                </h2>
              </v-card>
              <div class="text-center">
                <router-link :to="item.path">
                  <v-btn size="x-large" class="text-white" color="primary">Explore</v-btn>
                </router-link>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="0" md="6">
            <v-card>
              <router-link :to="item.path">
                <v-img
                    height="420"
                    class="v-card--hover"
                    cover
                    :src="item.image"
                ></v-img>
              </router-link>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-toolbar>
        <v-toolbar-title></v-toolbar-title>
      </v-toolbar>
    </template>
  </ItemCard>

  <!-- Random DSO ? -->
  <RandomDsoHomepage />
</template>

<script setup>
import {computed, defineAsyncComponent} from 'vue'

import configs from "@/configs";

/**
 * Components
 */
import ItemCard from "@/components/Home/ItemCard.vue";
import { useRouter} from "vue-router";
const HeroPresentation = defineAsyncComponent(() => import('@/components/Home/HeroPresentation.vue'))
const SearchAutocomplete = defineAsyncComponent(() => import("@/components/Home/SearchAutocomplete.vue"))
const RandomDsoHomepage = defineAsyncComponent(() => import("@/components/Home/RandomDsoHomepage.vue"))

/**
 * Data
 * @type {[{routeName: string},{routeName: string},{routeName: string}]}
 */
const homePageRoutes = configs.homePages;

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
    text: routeItem.meta.text,
    description: routeItem.meta.description,
    path: path
  }
});
}
</script>
<style scoped>
</style>

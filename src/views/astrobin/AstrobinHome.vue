<template>
  <TitleImageHero title="" :url-image="astrobinLogo" />

  <v-toolbar height="30">
    <v-toolbar-title class="text-h6 align-center">
      This product uses the AstroBin API but is not endorsed or certified by AstroBin.
    </v-toolbar-title>
  </v-toolbar>

  <ItemCard :items="processedItems">
    <template v-slot="{item, index}">
      <v-container class="text-center" :data-index="index">
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
                <v-btn size="x-large" class="text-white" color="primary" :to="item.path">Explore</v-btn>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="0" md="6">
            <v-card>
              <router-link to="{name: 'today'}">
                <v-img
                    height="420"
                    cover
                    :src="item.image"
                ></v-img>
              </router-link>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </ItemCard>
</template>

<script setup>
import {computed, defineAsyncComponent, ref} from 'vue'
import configs from "@/configs";
import AstrobinLogo from '@/assets/images/background/astrobin.png'

import ItemCard from "@/components/Home/ItemCard.vue";
import {useRouter} from "vue-router";

const TitleImageHero = defineAsyncComponent(() => import('@/components/Content/TitleImageHero.vue'))

const astrobinLogo = ref(AstrobinLogo);
const astrobinMenu = configs.astrobinMenu;

const processedItems = computed(() => {
  const allRoutes = useRouter().options.routes;
  return buildPageItems(astrobinMenu, allRoutes)
});

function buildPageItems(homeAstrobinRoutes, allRoutes) {
  return homeAstrobinRoutes.map(route => {
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

<script>
export default {
  name: "AstrobinHome"
}
</script>

<style scoped>

</style>
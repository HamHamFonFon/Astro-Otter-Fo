<template>
  <v-app-bar
    color="secondary"
    mode="shift"
    :density="!this.$isMobile() ? 'default' : 'compact'"
  >
    <v-toolbar color="secondary">
      <router-link to="home">
        <v-avatar class="mx-2"><v-img :src="logo" ></v-img></v-avatar>
      </router-link>
      <v-divider vertical thickness="2" inset :class="!this.$isMobile() ? 'ml-5 mr-1' : 'mr-1'"></v-divider>

      <v-icon>constellation</v-icon>
      <CustomIcon icon-name="constellation"></CustomIcon>
<!--      <v-icon :icon="$vuetify.icons.constellation.default"></v-icon>-->
<!--      <CustomIcon icon-name="test"/>-->


      <v-btn v-for="(menuItem, index) in processedMenu(menu, allRoutes)" stacked="" v-bind:key="index" class="text-none">
        <router-link :to="menuItem.path">
          <span v-if="!this.$isMobile()" class="text-grey">{{ menuItem.text }}</span>
<!--          <v-icon v-else-if="this.$isMobile()"></v-icon>-->
        </router-link>
      </v-btn>

      <v-divider vertical thickness="2" inset :class="!this.$isMobile() ? 'ml-5 mr-1' : 'mr-1'"></v-divider>
      <Transition>
        <v-autocomplete
            v-if="!this.$isMobile()"
            v-show="showSearch"
            v-model="select"
            v-model:search="search"

            :loading="loading"
            color="secondary"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-magnify"
            hide-no-data
            hide-details
            placeholder="Search a galaxy, nebula or constellation..."
        ></v-autocomplete>
      </Transition>
      <v-btn icon @click="displaySearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
  </v-app-bar>
</template>

<script setup>
import {computed, defineAsyncComponent, ref, watch} from "vue";

import astroOtterLogo from '@/assets/images/logos/astro_otter_200-200.png'
import configs from "@/configs";

// Components
const CustomIcon = defineAsyncComponent(() => import("@/components/icons/CustomIcon.vue"));

// Data
const menu = ref(configs.headerMenu);
const logo = ref(astroOtterLogo);
const showSearch = ref(false);
const loading = ref(false);
const select = ref(null);
const search = ref(null);

// Props
defineProps({
  allRoutes: {
    type: Array
  }
});

// Methods
const buildMenu = (items, allRoutes) => {
  return items.map(route => {
    let routeName = route.routeName;
    const routeItem = allRoutes.filter(route => route.name === routeName)[0];
    return {
      key: routeItem.meta.key,
      icon: routeItem.meta.icon ?? 'mdi-tooltip-text-outline',
      path: routeItem.path,
      text: routeItem.meta.text
    };
  })
};
const displaySearch = () => {
  this.showSearch = !this.showSearch;
};

const querySearch = (v) => {
  console.log('Send ' + v + ' to Astro otter API');
  this.loading = true;
  setTimeout(() => {
    this.loading = false;
  }, 500);
};

// Computed
const processedMenu = computed(() => buildMenu);

// Watch
watch(search, (val) => {
  val && val !== this.select && querySearch(val)
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
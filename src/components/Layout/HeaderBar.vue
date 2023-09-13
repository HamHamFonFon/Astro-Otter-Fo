<template>
  <v-app-bar
    color="secondary"
    mode="shift"
    :density="!isMobile ? 'default' : 'compact'"
  >
    <v-toolbar color="secondary">
      <router-link :to="{ name: 'home'}">
        <v-avatar class="mx-2"><v-img :src="logo" ></v-img></v-avatar>
      </router-link>
      <v-divider vertical thickness="2" inset :class="!isMobile ? 'ml-5 mr-1' : 'mr-1'"></v-divider>

<!--      <CustomIcon icon-name="constellation"></CustomIcon>-->
<!--      <v-icon :icon="$vuetify.icons.constellation.default"></v-icon>-->
<!--      <CustomIcon icon-name="test"/>-->


      <v-btn v-for="(menuItem, index) in processedMenu(menu, props.allRoutes)" stacked="" v-bind:key="index" class="text-none">
        <router-link :to="menuItem.path">
          <span v-if="!isMobile" class="text-grey">{{ menuItem.text }}</span>
<!--          <v-icon v-else-if="this.$isMobile()"></v-icon>-->
        </router-link>
      </v-btn>

      <v-divider vertical thickness="2" inset :class="!isMobile ? 'ml-5 mr-1' : 'mr-1'"></v-divider>
      <Transition>
        <v-autocomplete
            v-if="!isMobile"
            v-show="showSearch"

            v-model="searchInput"
            :items="searchResults"
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
      <v-btn icon @click="toggleInputSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
  </v-app-bar>
</template>

<script setup>
import {computed, ref, watch} from "vue";

import astroOtterLogo from '@/assets/images/logos/astro_otter_200-200.png'
import configs from "@/configs";

// Components
// const CustomIcon = defineAsyncComponent(() => import("@/components/icons/CustomIcon.vue"));

// Data
const menu = ref(configs.headerMenu);
const logo = ref(astroOtterLogo);
const showSearch = ref(false);

const searchInput = ref('');
const searchResults = ref([]);
const loading = ref(false);

const isMobile = computed(() => {
  return screen.width <= 760;
});

// Props
const props = defineProps({
  allRoutes: {
    type: Array
  }
});

// Computed
const processedMenu = computed(() => buildMenu);

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
const toggleInputSearch = () => {
  showSearch.value = !showSearch.value;
};


/**
 * Run WS and set data
 */
const fetchData = () => {
  loading.value = true;
  console.log('Send to API: ' + searchInput.value);
  setTimeout(() => {
    searchResults.value = ['Orion nebula', 'm42']
    loading.value = false;
  }, 500);
};

watch(searchInput, () => {
  if (searchInput.value.length >= 3 && true === showSearch.value) {
    fetchData();
  }
});

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
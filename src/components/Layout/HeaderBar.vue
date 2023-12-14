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
        <v-text-field
            v-if="!isMobile"
            v-show="showSearch"

            ref="inputSearch"
            v-model="inputSearchItems"
            :loading="loading"

            color="secondary"
            variant="outlined"
            density="comfortable"
            clearable
            prepend-inner-icon="mdi-magnify"
            hide-no-data
            hide-details
            :placeholder="$t('search.placeholder')"
        ></v-text-field>
      </Transition>
      <v-btn icon @click="toggleInputSearch">
        <v-icon>{{ iconSearch }}</v-icon>
      </v-btn>
    </v-toolbar>
  </v-app-bar>

  <div class="resultsHeader" v-if="results && 0 < results.length">
    <ul
        color="transparent"
    >
      <li
          v-for="item in results"
          v-bind:key="item"
          @click="toggleInputSearch"
      >
        <router-link :to="{ name: 'dso', params: { id: item.id } }">
          <span class="v-list-item-title">{{ item.text }}</span>
          <span class="v-list-item-subtitle">{{ item.type }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

import astroOtterLogo from '@/assets/images/logos/astro_otter_200-200.png'
import configs from "@/configs";
import {searchItems} from "@/services/autocompleteSearch";

// Components
// const CustomIcon = defineAsyncComponent(() => import("@/components/icons/CustomIcon.vue"));

// Data
const menu = ref(configs.headerMenu);
const logo = ref(astroOtterLogo);
const showSearch = ref(false);
const iconSearch = ref('mdi-magnify');

const inputSearch = ref(null);
const inputSearchItems = ref('');
const results = ref([]);

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
      text: t(`${routeName}.title`),
      description: t(`${routeName}.title`)
    };
  })
};
const toggleInputSearch = () => {
  showSearch.value = !showSearch.value;
  iconSearch.value = (false === showSearch.value) ? 'mdi-magnify': 'mdi-close';
  if (false === showSearch.value) {
    results.value = [];
    inputSearchItems.value = '';
  } else {
    // console.log('Autofocus');
    // inputSearch.value.focus();
  }
};

/**
 * Run WS and set data
 */
watch(inputSearchItems, (newSearch) => {
  setTimeout(async () => {
    results.value = await searchItems(newSearch);
  }, 200);
});

</script>

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


      <v-btn v-for="(menuItem, index) in this.processedMenu(this.menu, allRoutes)" stacked="" v-bind:key="index" class="text-none">
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

<script>
import logo from '@/assets/images/logos/astro_otter_200-200.png'
import configs from "@/configs";
import CustomIcon from "@/components/icons/CustomIcon.vue";

export default {
  name: "HeaderBar",
  components: {CustomIcon},
  data() {
    return {
      menu: configs.headerMenu,
      logo: logo,
      showSearch: false,
      loading: false,
      select: null,
      search: null
    }
  },
  props: {
    allRoutes: {
      type: Array
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySearch(val)
    }
  },
  computed: {
    processedMenu() {
      return this.buildMenu;
    }
  },
  methods: {
    buildMenu: (items, allRoutes) => {
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
    },
    displaySearch() {
      this.showSearch = !this.showSearch;
    },
    querySearch: (v) => {
      console.log('Send ' + v + ' to Astro otter API');
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },

  }
}
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
<template>
  <!-- Hero component -->
  <HeroPresentation />
  <v-toolbar>
    <v-toolbar-title></v-toolbar-title>
  </v-toolbar>

  <!-- Search autocomplete component -->
  <a ref="search" id="search"></a>
  <SearchAutocomplete />
  <v-toolbar>
    <v-toolbar-title></v-toolbar-title>
  </v-toolbar>

  <!-- Page cards component -->
  <a ref="pages" id="pages"></a>
  <ItemCard :items="this.processedItems">
    <template v-slot="{item, index}">
      <v-toolbar>
        <v-toolbar-title></v-toolbar-title>
      </v-toolbar>
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
              <router-link :to="item.path">
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

  <!-- Stats components ? -->
</template>

<script>
import HeroPresentation from '@/components/Home/HeroPresentation.vue'
import SearchAutocomplete from "@/components/Home/SearchAutocomplete.vue";
import ItemCard from "@/components/Home/ItemCard.vue";
import configs from "@/configs";

export default {
  name: "HomePage",
  components: {
    HeroPresentation,
    SearchAutocomplete,
    ItemCard
  },
  data() {
    return {
      homePageRoutes: configs.homePages
    }
  },
  computed: {
    processedItems() {
      const allRoutes = this.$router.options.routes;
      const homePageRoutes = this.homePageRoutes
      return this.buildHomeItems(homePageRoutes, allRoutes);
    }
  },
  methods: {
    buildHomeItems: (homePageRoutes, allRoutes) => {
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
  }
}
</script>

<style scoped>

</style>
<template>
    <v-sheet
        elevation="0"
        class="landing-warpper"
        color="secondary"
    >
      <v-container class="text-left pa-10">
        <v-sheet
            class="mx-auto"
            color="transparent"
            elevation="0"
            max-width="1600"
        >
          <v-row>
            <v-col cols="12" md="6">
              <p class="my-4 text-grey">Explore wonders and mysteries of the universe</p>
            </v-col>
            <v-col cols="12" md="6">
              <div class="d-flex flex-wrap justify-center justify-md-end pb-5">
                <v-btn v-for="(socialNetwork, index) in socialNetworks"
                       v-bind:key="index"
                       color="blue-grey-darken-2"
                       class="mx-3"
                       @click="openSocialNetwork(socialNetwork.to)"
                       icon
                >
                  <v-icon>{{ socialNetwork.icon }}</v-icon>
                </v-btn>
              </div>

              <div class="d-flex flex-wrap justify-center justify-md-end">
                <router-link
                    class="text-primary mx-3 mb-3 font-weight-bold"
                    v-for="nav in processedFooterMenu(footerPages, props.allRoutes)"
                    :to="nav.path"
                    v-bind:key="nav.key"
                >
                  <span class="text-grey">{{ nav.text }}</span>

                </router-link
                >
              </div>
            </v-col>
          </v-row>
          <hr class="my-3" />
          <p class="text-center my-5">© All Rights Reserved</p>
        </v-sheet>
      </v-container>
  </v-sheet>
</template>

<script setup>
import configs from "@/configs";
import {computed, ref} from "vue";

const socialNetworks = ref(configs.socialNetworks);
const footerPages = ref(configs.footerPages);

const props = defineProps({
  allRoutes: {
    type: Array
  }
});

const openSocialNetwork= (link) => {
  window.open(link, '_blank')
};

const buildMenu = (footerPages, allRoutes) => {
  return footerPages.map(route => {
    let routeName = route.routeName;
    const routeItem = allRoutes.filter(route => route.name === routeName)[0];
    let path = routeItem.path;
    return {
      key: routeItem.meta.key,
      text: routeItem.meta.text,
      path: path
    }
  });
};

const processedFooterMenu = computed(() => buildMenu );
</script>

<style scoped>

</style>
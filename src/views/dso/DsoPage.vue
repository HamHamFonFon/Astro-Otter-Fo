<template>
  <transition name="fade">
    <Message />
  </transition>
  <transition name="fade">
    <v-sheet
        elevation="0"
        class="landing-warpper"
        color="transparent"
        v-if="!isLoading"
    >
        <TitleParallax v-if="null !== dsoCover" :title="dso.fullNameAlt" :urlImage="dsoCover" :user="dso.astrobinUser.username"></TitleParallax>
        <TitlePage v-else :title="dso.fullNameAlt"></TitlePage>

        <v-container class="text-left" :style="{margin: 'auto'}">
          <v-row class="flex-0" dense>
            <v-col cols="12" xl="4">
              <v-card class="card-shadow" color="background">
                <v-card-title>
                  <v-icon icon="mdi-information-outline" class="mr-2" left></v-icon>
                  Informations
                </v-card-title>
                <v-list-item
                    v-for="(item, i) in dsoData"
                    :key="i"
                    :value="item"
                    color="primary"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title left>
                    <v-row>
                      <v-col v-if="!isMobile" cols="6" sm="4">{{item.label}}</v-col>
                      <v-col cols="12" sm="8">{{item.value}}</v-col>
                    </v-row>
                  </v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-card-text>
                  {{ dso.description }}
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="12" xl="8" v-if="0 < galleryImages.length">
              <v-carousel
                  hide-delimiter-background
                  show-arrows="hover"
                  v-if="0 < galleryImages.length"
              >
                <v-carousel-item
                  v-for="image in galleryImages"
                  v-bind:key="image.id"
                  :src="image.urlHd"
                  cover
                >
                  {{ image.title }}
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>

          <v-img
              :src="dso.astrobin.url_advanced_skyplot_small"
              cover
          ></v-img>

          <SkyMap
            :constellationId="dso.constellation.id"
            :centerMap="dsoGeoJson.features[0].geometry.coordinates"
            :itemsGeoData="dsoGeoJson"
          ></SkyMap>
        </v-container>
    </v-sheet>
  </transition>
</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import {DsoWs} from "@/repositories/api/dso";
import {ImagesWs} from "@/repositories/astrobin/images";
import { geoJsonServices } from "@/services/geojson";

const store = useStore();
const route = useRoute();

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitleParallax = defineAsyncComponent(() => import('@/components/Content/TitleParallax.vue'));
const TitlePage = defineAsyncComponent(() => import('@/components/Content/TitlePage.vue'));
const SkyMap = defineAsyncComponent(() => import('@/components//Content/SkyMap.vue'));

const dsoId = ref(route.params.id);
const dsoRef = ref({});
const galleryImages = ref({});

onBeforeMount(() => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': 'Loading DSO data...',
    'httpCode': null
  });
})

onMounted(() =>  {
  fetchDso();
})

const fetchDso = async () => {
  try {
    dsoRef.value = await DsoWs.GET_DSO_ITEM(dsoId.value);
  } catch (err) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': err.message,
      'httpCode': err.code
    }, { root: true })
  }
  store.commit('message/setLoading', false);
};

const fetchGalleryImages = async (id) => {
  try {
    const params = {};
    params['title__icontains'] = id;
    return await ImagesWs.GET_IMAGES_BY(params, 0, 10);
  } catch (err) { console.error(err.message)}
}

const isLoading = computed(() => store.state.message.loading);
const dso = computed(() => dsoRef.value )
const dsoCover = computed(() => (dso.value.astrobinUser) ? dso.value.astrobin.url_hd: null);
const dsoGeoJson = computed(() => geoJsonServices.geoJsonDso([dsoRef.value]))
const dsoData = computed(() => {
  return [
    {icon: 'mdi-book-open-outline', label: 'Catalogs', value: dsoRef.value.catalogsLabel.join(', ')},
    {icon: 'mdi-list-box-outline', label: 'Others designations', value: dsoRef.value.desigs.join(', ')},
    {icon: 'mdi-telescope', label: 'Type', value: dsoRef.value.typeLabel},
    {icon: 'mdi-chart-timeline-variant-shimmer', label: 'Constellation', value: dsoRef.value.constellation.alt},
    {icon: 'mdi-eye-outline', label: 'Magnitude', value: dsoRef.value.magnitude},
    {icon: 'mdi-longitude', label: 'Right ascension', value: dsoRef.value.rightAscencion},
    {icon: 'mdi-latitude', label: 'Declinaison', value: dsoRef.value.declinaison},
    {icon: 'mdi-account-supervisor', label: 'Discover', value: dsoRef.value.discover},
    {icon: 'mdi-calendar-alert', label: 'Year', value: dsoRef.value.discoverYear},
    {icon: 'mdi-camera', label: 'Astrobin credit', value: dsoRef.value.astrobinUser.username},
    {icon: 'mdi-update', label: 'Last update', value: convertDate(dsoRef.value.updatedAt.timestamp)},
  ]
});

watch(dso, (newDso) => {
  if (newDso) {
    const galleryResponse = fetchGalleryImages(newDso.id);
    galleryResponse.then((data) => galleryImages.value = data.listImages);
  }
});

const isMobile = computed(() => screen.width <= 760);

const convertDate = (timestamp) => {
  const currentDate = new Date(timestamp*1000);
  return currentDate.getDate()+
      "/"+(currentDate.getMonth()+1)+
      "/"+currentDate.getFullYear();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
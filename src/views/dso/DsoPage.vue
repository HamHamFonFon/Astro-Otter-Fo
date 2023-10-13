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
        <TitleParallax v-if="null !== dsoCover" :title="dsoRef.fullNameAlt" :urlImage="dsoCover" :user="dsoRef.astrobinUser.username"></TitleParallax>
        <TitlePage v-else :title="dsoRef.fullNameAlt"></TitlePage>

        <v-container class="text-left" :style="{margin: 'auto'}">
          <v-row class="card-shadow flex-grow-0" dense id="dsoBlocks">
            <v-col cols="12" xl="6">
              <DsoDataCard :dsoData="dsoData" :description="dsoRef.description" />
            </v-col>
            <v-col cols="12" xl="6">
              <SkyMap
                  :constellationId="dsoRef.constellation.id"
                  :centerMap="dsoGeoJson.features[0].geometry.coordinates"
                  :itemsGeoData="dsoGeoJson"
              ></SkyMap>
            </v-col>
            <v-col cols="12" xl="6" v-if="galleryImages && 0 < galleryImages.length">
              <DsoCarousel :gallery-images="galleryImages"></DsoCarousel>
            </v-col>
            <v-col cols="12" xl="6" v-if="null !== dsoCover" >
              <DsoAstrobinCard :astrobinId="dsoRef.astrobinId" :astrobinImage="dsoRef.astrobin" :astrobinUser="dsoRef.astrobinUser" />
            </v-col>

          </v-row>
        </v-container>
    </v-sheet>
  </transition>
</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, onMounted, ref} from "vue";
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
const DsoDataCard = defineAsyncComponent(() => import('@/components/Dso/DsoDataCard.vue'));
const DsoCarousel = defineAsyncComponent(() => import('@/components/Dso/DsoCarousel.vue'))
const DsoAstrobinCard = defineAsyncComponent(() => import('@/components/Dso/DsoAstrobinCard.vue'));
const SkyMap = defineAsyncComponent(() => import('@/components/Content/SkyMap.vue'));

const dsoId = ref(route.params.id);
const dsoRef = ref({});
const galleryImages = ref({});

onBeforeMount(() => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': `Please wait while loading ${route.params.id} data...`,
    'httpCode': null
  });
})

onMounted(async () =>  {
  try {
    await fetchDso();
    await fetchGalleryImages();
    store.commit('message/setLoading', false);
  } catch (err) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': err.message,
      'httpCode': err.code
    }, { root: true })
  }
});

const fetchDso = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      dsoRef.value = await DsoWs.GET_DSO_ITEM(dsoId.value);
      resolve(dsoRef.value)
    } catch (err) {
      reject(err);
    }
  });
};

const fetchGalleryImages = async () => {
  try {
    const params = {};
    params['title__icontains'] = dsoRef.value.id;
    const data = await ImagesWs.GET_IMAGES_BY(params, 0, 10);
    galleryImages.value = data.listImages;
  } catch (err) { console.error(err.message)}
}

const isLoading = computed(() => store.state.message.loading);
const dsoCover = computed(() => (dsoRef.value.astrobinUser) ? dsoRef.value.astrobin.url_hd: null);
const dsoGeoJson = computed(() => geoJsonServices.geoJsonDso([dsoRef.value]))
const dsoData = computed(() => {
  return [
    {icon: 'mdi-book-open-outline', label: 'Catalogs', value: dsoRef.value.catalogsLabel.join(', ')},
    {icon: 'mdi-list-box-outline', label: 'Others designations', value: Object.keys(dsoRef.value.otherDesigs).map(key => `${dsoRef.value.otherDesigs[key]}`).join(', ')},
    {icon: 'mdi-telescope', label: 'Type', value: dsoRef.value.typeLabel},
    {icon: 'mdi-chart-timeline-variant-shimmer', label: 'Constellation', value: dsoRef.value.constellation.alt},
    {icon: 'mdi-eye-outline', label: 'Magnitude', value: dsoRef.value.magnitude},
    {icon: 'mdi-star-shooting', label: 'Distance (light-year)', value: dsoRef.value.distanceLightYear},
    {icon: 'mdi-longitude', label: 'Right ascension', value: dsoRef.value.rightAscencion},
    {icon: 'mdi-latitude', label: 'Declinaison', value: dsoRef.value.declinaison},
    {icon: 'mdi-account-supervisor', label: 'Discover', value: dsoRef.value.discover},
    {icon: 'mdi-calendar-alert', label: 'Year', value: dsoRef.value.discoverYear},
    {icon: 'mdi-update', label: 'Last update', value: convertDate(dsoRef.value.updatedAt.timestamp)},
  ].filter(d => d.value !== '' && null !== d.value && undefined !== d.value)
});

const convertDate = (timestamp) => {
  const currentDate = new Date(timestamp*1000);
  return currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>